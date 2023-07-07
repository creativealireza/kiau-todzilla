import { useState, useEffect } from "react";
import { EditTextarea } from "./EditTextarea";
import { EditMembers } from "./EditMembers";
import { useSelector } from 'react-redux';
import { editTasks } from "../../../../API/API";
import { readData } from "../../../../Tools/localActions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Divider,
    TextField,
    LinearProgress
} from '@mui/material';

export const EditDialog = ({ modalStatus, handleEditDialog, editTask, updateTasks, adminId }) => {
    const taskMembers = useSelector(state => state.members)
    const membersFromLocal = readData("user")?.members;

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(editTask?.value?.description);
    const [selectedMembers, setSelectedMembers] = useState(editTask?.value?.members || []);

    async function handleEdit() {
        setIsLoading(true)

        const editedTask = Object.assign({}, editTask?.value);
        editedTask.title = title;
        editedTask.description = description;
        editedTask.members = selectedMembers;
        editedTask.isEdited = true;
        editedTask.adminId = adminId;

        const editedTaskResult = await editTasks(editedTask);

        if (editedTaskResult.status === 200) {
            updateTasks(editedTaskResult?.data?.tasks.reverse())
            setIsLoading(false)
            handleEditDialog();
        }
    }

    useEffect(() => {
        handleInitial()
    }, [editTask])


    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleInitial() {
        setTitle(editTask?.value?.title)
        setDescription(editTask?.value?.description)
        setSelectedMembers(editTask?.value?.members)
    }

    return (
        <Dialog
            open={modalStatus}
            onClose={handleEditDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {isLoading && <LinearProgress />}
            <DialogTitle id="alert-dialog-title">
                Edit {title}
            </DialogTitle>

            <Divider variant="middle" />

            <DialogContent>
                <DialogContentText>
                    Edit as you wish
                </DialogContentText>

                <TextField
                    autoFocus
                    value={title}
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    onLoad={handleInitial}
                    onChange={handleTitle}
                    sx={{ marginTop: "1rem" }}
                />

                <EditTextarea taskDescription={{ value: description, setValue: setDescription }} />

                <EditMembers
                    members={taskMembers?.length !== 1 ? taskMembers?.at(0)?.members : membersFromLocal}
                    selectMembers={{ value: selectedMembers, setValue: setSelectedMembers }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleEditDialog();
                    setSelectedMembers([])
                }}>Nah, I`m Good</Button>
                <Button onClick={handleEdit} autoFocus>
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}