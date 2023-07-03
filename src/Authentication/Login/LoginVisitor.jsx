import { useState } from "react";
import { Link } from 'react-router-dom';
import { getVisitor } from "../../API/API";
import { useDispatch } from 'react-redux';
import { isAuth } from '../authSlice';
import { getMember } from '../../components/Members/MembersSlice';
import { saveData } from '../../Tools/localActions';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    LinearProgress,
    useMediaQuery
} from '@mui/material';

export const LoginVisitor = ({ openForm, OpenLogin, AuthDialog }) => {
    const formMinWidth = useMediaQuery('(max-width : 420px)');

    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const handleLoginVisitor = async () => {
        setIsLoading(true)

        const visitor = await getVisitor({ username })

        if (visitor?.status === 200) {
            dispatch(isAuth())
            setIsLoading(false)

            saveData("user", visitor?.data)
            dispatch(getMember(visitor?.data))
        }
    }

    function handleForm(e) {
        setUsername(e?.target?.value)
    }

    return (
        <Dialog
            open={openForm}
            onClose={(_, reason) =>
                reason === 'backdropClick' || reason === 'escapeKeyDown' ?
                    "" : OpenLogin()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {isLoading && <LinearProgress />}
            <DialogTitle id="alert-dialog-title">
                Login (Visitor)
            </DialogTitle>
            <DialogContent>
                <TextField
                    required
                    error={!username}
                    helperText="Fill the input."
                    id="username"
                    label="Username"
                    variant="standard"
                    autoFocus
                    sx={{ marginTop: "1rem", minWidth: formMinWidth ? "100%" : 300 }}
                    onChange={handleForm}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    to="/auth"
                    component={Link}
                    onClick={() => {
                        OpenLogin();
                        AuthDialog();
                    }}>
                    Back
                </Button>
                <Button onClick={() => {
                    handleLoginVisitor();
                }}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}