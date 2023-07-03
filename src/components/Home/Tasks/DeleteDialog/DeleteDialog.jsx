import { useState } from "react";
import { deleteTasks } from "../../../../API/API";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    LinearProgress
} from '@mui/material';

export const DeleteDialog = ({
    modalStatus,
    DeleteDialogTitle,
    DialogDescription,
    DeleteBtnTitle,
    CancelBtnTitle,
    handleDeleteDialog,
    deleteTask,
    isReq }) => {

    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
        setIsLoading(true)

        const newTasks = await deleteTasks(deleteTask)

        if (newTasks.status === 200) {
            setIsLoading(false)
            isReq(req => !req)
            handleDeleteDialog()
        }
    }

    return (
        <Dialog
            open={modalStatus}
            onClose={handleDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {isLoading && <LinearProgress />}
            <DialogTitle id="alert-dialog-title">
                {DeleteDialogTitle}
            </DialogTitle>

            <Divider variant="middle" />

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {DialogDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialog}>{CancelBtnTitle}</Button>
                <Button onClick={handleDelete}>
                    {DeleteBtnTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
}