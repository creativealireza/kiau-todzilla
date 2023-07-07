import React from 'react';
import { TasksList } from "./TasksList";
import FunctionsIcon from '@mui/icons-material/Functions';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useMediaQuery,
    Divider
} from '@mui/material';


export const TasksDialog = React.memo(({ open, handleTasksDialog, tasks }) => {
    const textVisibility = useMediaQuery('(max-width : 500px)');

    return (
        <Dialog
            open={open}
            onClose={handleTasksDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: "space-between" }}>
                <Typography gutterBottom>
                    Tasks
                </Typography>
                <Button
                disableRipple
                variant="contained"
                disabled
                startIcon={<FunctionsIcon />}
                sx={{
                    textTransform: "none",
                    height: textVisibility && '38px',

                    "&:disabled": {
                        backgroundColor: `#0288d1`,
                        color: "white"
                    }
                }}
            >
                {`Total Tasks:`} {tasks?.length}
            </Button>
            </DialogTitle>

            <Divider variant="middle" />

            <DialogContent>
                <TasksList tasks={tasks} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTasksDialog}>Back</Button>
            </DialogActions>
        </Dialog>
    );
})