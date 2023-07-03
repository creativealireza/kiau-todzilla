import { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress
} from '@mui/material';
import { deleteCompletedTasks } from "../../../API/API";
import DeleteIcon from '@mui/icons-material/Delete';
import { readData } from "../../../Tools/localActions";

export const DeleteCompletedTasks = ({ title, adminId, isReq, errorMessage }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = readData("user");
  const userId = user?.memberId ? user?.memberId : user?.adminId;

  async function handleDeleteDialog() {
    setOpenDelete(openDelete => !openDelete);
  }

  async function handleDeleteAll() {
    setIsLoading(true)

    const deleteCompleteTasks = await deleteCompletedTasks({ adminId, userId });

    if (deleteCompleteTasks?.status === 200) {
      handleDeleteDialog();
      setIsLoading(false);
      errorMessage();
      isReq(req => !req);
    }
  }

  return (
    <Stack alignSelf="flex-start">
      <Button
        disableRipple
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        sx={{
          textTransform: "none",
        }}
        onClick={handleDeleteDialog}
      >
        {title}
      </Button>
      <Dialog
        open={openDelete}
        onClose={handleDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isLoading && <LinearProgress />}
        <DialogTitle id="alert-dialog-title">
          Delete All Tasks?
        </DialogTitle>

        <Divider variant="middle" />

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are You Sure? Sure Sure?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialog}> {"Mission Abort"}</Button>
          <Button onClick={handleDeleteAll}>
            {"Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
