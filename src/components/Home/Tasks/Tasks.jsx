import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog/DeleteDialog";
import { EditDialog } from "./EditDialog/EditDialog";
import { completeTasks, revertTasks } from "../../../API/API";
import { readData } from "../../../Tools/localActions"
import {
    CssBaseline,
    Container,
    Stack,
    Avatar,
    Divider,
    AvatarGroup,
    ButtonGroup,
    Button,
    Box,
    Typography,
    useMediaQuery,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const Tasks = ({ complete, edit, tasks, updateTasks, isReq, errorMessage, adminId }) => {
    const isHorizontal = useMediaQuery('(max-width : 650px)');
    const profile500 = useMediaQuery('(max-width : 500px)');
    const profile450 = useMediaQuery('(max-width : 450px)');

    const [loading, setLoading] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editTask, setEditTask] = useState({})
    const [deleteTask, setDeleteTask] = useState({})
    const [completeTaskId, setCompleteTaskId] = useState(0);
    const [revertTaskId, setRevertTaskId] = useState(0);

    const user = readData("user");
    const userId = user?.memberId ? user?.memberId : user?.adminId;

    function handleDeleteDialog(deleteTaskId, DeleteTitle) {
        setOpenDelete(openDelete => !openDelete);
        setDeleteTask({ adminId, deleteTaskId, userId, DeleteTitle });
    }

    function handleEditDialog(editTasks) {
        setOpenEdit(openEdit => !openEdit);
        setEditTask(editTasks);
    }

    async function handleComplete(taskId) {
        setLoading(true);
        setCompleteTaskId(taskId);
        const completedTasks = await completeTasks({ adminId, taskId, userId });

        if (completedTasks?.status === 200) {
            setLoading(false);
            errorMessage();
        }

        isReq(req => !req);
    }

    async function handleRevert(taskId) {
        setLoading(true);
        setRevertTaskId(taskId);
        const revertedTasks = await revertTasks({ adminId, taskId, userId });

        if (revertedTasks?.status === 200) {
            setLoading(false);
            errorMessage();
        }

        isReq(req => !req);
    }

    return (
        <Stack sx={{ width: "100%" }}>
            <CssBaseline />
            <Container sx={{ padding: "0 !important" }}>
                {tasks && tasks.map((task, index) =>
                    <Stack
                        key={task?.taskId}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        sx={{
                            padding: "1rem 0.6rem",
                            boxShadow: "5px 5px 10px 1px rgb(0 0 0 / 50%)",
                            borderRadius: "5px",
                            margin: "1.6rem 0"
                        }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ padding: "1.2rem 0" }}>

                            <Box width="1.6rem">
                                {`${index + 1}`.padStart(2, '0')}
                            </Box>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <Stack sx={{ paddingLeft: "1rem" }}>
                                <Typography variant="h5" gutterBottom noWrap={false} sx={{ fontWeight: "bold" }}>
                                    {task?.title}
                                </Typography>
                                <Typography paragraph sx={{ maxWidth: "15rem" }}>
                                    {task?.description}
                                </Typography>
                                <AvatarGroup
                                    max={profile500 ? profile450 ? 4 : 7 : 10}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "center",
                                    }}
                                >
                                    {task?.members
                                        ?.sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin))
                                        ?.map(member =>
                                            <Avatar
                                                key={member?.memberId}
                                                alt={member?.fullName}
                                                src={member?.profilePhoto}
                                            />
                                        )}
                                </AvatarGroup>
                            </Stack>
                        </Stack>

                        {isHorizontal && <Divider sx={{ width: "90%" }} orientation="horizontal" variant="middle" flexItem />}

                        <ButtonGroup
                            orientation={isHorizontal ? "horizontal" : "vertical"}
                            aria-label="vertical outlined button group"
                            sx={{ margin: `${isHorizontal ? "0.6rem auto 0" : "0"}`, minWidth: 120 }}
                        >
                            {edit && user?.isAdmin && <Button
                                key="edit"
                                sx={{ "&:hover": { background: "#0288d1", color: "#fff", border: "1px solid #0288d1" } }}
                                onClick={() => handleEditDialog(task)}>
                                Edit
                            </Button>}
                            <Button
                                key="delete"
                                sx={{ "&:hover": { background: "#d32f2f", color: "#fff", border: "1px solid #d32f2f" } }}
                                onClick={() => handleDeleteDialog(task?.taskId, task?.title)}>
                                Delete
                            </Button>
                            {!complete &&
                                <LoadingButton
                                    key="complete"
                                    size="small"
                                    onClick={() => handleComplete(task?.taskId)}
                                    loading={loading && completeTaskId === task?.taskId}
                                    sx={{
                                        "&:hover": { background: "#388e3c", color: "#fff", border: "1px solid #388e3c" },
                                        "&:disabled": { border: "1px solid rgba(25, 118, 210, 0.5)" }
                                    }}
                                    variant="outlined"
                                >
                                    <span>Complete</span>
                                </LoadingButton>
                            }
                            {complete &&
                                <LoadingButton
                                    key="revert"
                                    size="small"
                                    onClick={() => handleRevert(task?.taskId)}
                                    loading={loading && revertTaskId === task?.taskId}
                                    sx={{
                                        "&:hover": { background: "#ff9100", color: "#fff", border: "1px solid #ff9100" },
                                        "&:disabled": { border: "1px solid rgba(25, 118, 210, 0.5)" }
                                    }}
                                    variant="outlined"
                                >
                                    <span>Revert</span>
                                </LoadingButton>}
                        </ButtonGroup>
                    </Stack>
                )}


            </Container>

            <DeleteDialog
                isReq={isReq}
                modalStatus={openDelete}
                handleDeleteDialog={handleDeleteDialog}
                DeleteDialogTitle={`Delete ${deleteTask?.DeleteTitle}`}
                DialogDescription="Delete it and you are gonna need it immediately! 🙂"
                DeleteBtnTitle="Delete"
                CancelBtnTitle="Mission Abort"
                deleteTask={deleteTask} />
            <EditDialog
                updateTasks={updateTasks}
                editTask={{ value: editTask, setValue: setEditTask }}
                modalStatus={openEdit}
                handleEditDialog={handleEditDialog}
                adminId={adminId}
            />

        </Stack>
    );
}