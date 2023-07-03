import { useState, useEffect } from 'react';
import { Tasks } from "./Tasks/Tasks";
import { DeleteTasks } from "./Tasks/DeleteTasks";
import { DeleteCompletedTasks } from "./Tasks/DeleteCompletedTasks";
import { AddTasks } from "./Tasks/AddTasks/AddTasks";
import { TotalTasks } from "./Tasks/TotalTasks";
import { getUserName } from "../../Tools/getUserName";
import { useSelector } from 'react-redux';
import { getTasks, getVisitor } from "../../API/API";
import { FailedMessage } from "./FailedMessage";
import { readData, updateKeyObject } from '../../Tools/localActions';
import {
    CssBaseline,
    Container,
    Stack,
    Avatar,
    Divider,
    Chip,
} from '@mui/material';

export const Home = () => {
    const membersObj = useSelector(state => state.members)

    const [localUser, _] = useState(readData("user"));
    const [hasComplete, setHasComplete] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isReq, setIsReq] = useState(false);
    const [isError, setIsError] = useState(true);
    const [members, setMembers] = useState();

    useEffect(() => {
        setMembers(membersObj?.at(0)?.members?.length ? membersObj?.at(0) : localUser)
    }, [localUser, membersObj])

    function handleAddDialog() {
        setOpenAdd(openAdd => !openAdd)
    }

    function handleErrorMessage() {
        setIsError(true);
    }

    useEffect(() => {
        setTasks([]);
        setHasComplete([]);

        localUser?.isAdmin ?
            getTasks({ adminId: members?.adminId })
                .then(tasksArray => {
                    const completedTasks = [];
                    const normalTasks = [];

                    updateKeyObject("user", "tasks", tasksArray?.data && tasksArray?.data)
                    tasksArray?.data && tasksArray?.data?.map(taskArray =>
                        taskArray?.isCompleted ? completedTasks.push(taskArray) : normalTasks.push(taskArray)
                    )

                    setTasks(normalTasks?.reverse())
                    setHasComplete(completedTasks?.reverse())

                    setIsError(false);
                }) : getVisitor({
                    username:
                        getUserName(localUser?.github) &&
                        getUserName(localUser?.linkedIn)
                }).then(visitorObj => {
                    const completedTasks = [];
                    const normalTasks = [];

                    visitorObj?.data?.tasks?.map(visitor => {
                        if (visitor?.isCompleted) completedTasks.push(visitor);
                        else normalTasks.push(visitor)
                    })

                    setTasks(normalTasks?.reverse())
                    setHasComplete(completedTasks?.reverse())

                    setIsError(false);
                })

    }, [isReq, members])

    return (
        <>
            <CssBaseline />
            <Container>
                <Stack justifyContent="space-between" alignItems="center" spacing={3}>
                    <Stack direction="row" flexWrap="wrap" alignItems="center">
                        {members?.members?.map(member =>
                            <Avatar
                                key={member?.memberId}
                                alt={member?.fullName}
                                src={member?.profilePhoto}
                                sx={{
                                    margin: "0.2rem 0.4rem",
                                    minWidth: member?.isAdmin && "3rem",
                                    minHeight: member?.isAdmin && "3rem",
                                    border: member?.isAdmin && `3px solid #388e3c`,
                                }}
                            />)}
                    </Stack>

                    <Divider variant="middle" role="tasks" sx={{ width: "100%" }}>
                        <Chip label="ALL TASKS" />
                    </Divider>

                    <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                        <Stack direction="row">
                            {localUser?.isAdmin && <AddTasks isReq={setIsReq} openAdd={openAdd} handleAddDialog={handleAddDialog} errorMessage={handleErrorMessage} />}
                            <DeleteTasks title="Tasks" adminId={members?.adminId} isReq={setIsReq} />
                        </Stack>
                        <TotalTasks total={tasks?.length + hasComplete?.length} />
                    </Stack>

                    {/* {!tasks?.length && !isError &&
                        <Box sx={{ paddingTop: "3rem", textAlign: "center" }}>
                            <Typography variant="h4">No Active tasks.</Typography>
                            <Typography variant="subtitle2">Use Add or Revert.</Typography>
                        </Box>
                    } */}

                    <Tasks
                        edit
                        tasks={tasks}
                        updateTasks={setTasks}
                        isReq={setIsReq}
                        errorMessage={handleErrorMessage}
                        adminId={members?.adminId} />

                    {hasComplete.length > 0 &&
                        <>
                            <Divider variant="middle" role="tasks" sx={{ width: "100%" }}>
                                <Chip label="COMPLETED TASKS" />
                            </Divider>

                            <DeleteCompletedTasks title="Completed Tasks" adminId={members?.adminId} isReq={setIsReq} errorMessage={handleErrorMessage} />

                            <Tasks
                                complete
                                tasks={hasComplete}
                                updateTasks={setTasks}
                                isReq={setIsReq}
                                errorMessage={handleErrorMessage}
                                adminId={members?.adminId} />
                        </>
                    }
                    {(!tasks?.length && !hasComplete?.length) && <FailedMessage err={isError} />}

                </Stack>
            </Container>
        </>
    )
}