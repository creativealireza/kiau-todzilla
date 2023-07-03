import { useState } from "react";
import { Email } from "../../Form/Email";
import { Password } from "../../Form/Password";
import { emailValidation } from "../../Tools/emailValidation";
import { Link } from 'react-router-dom';
import { getAdmin } from "../../API/API";
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
    Stack,
    LinearProgress
} from '@mui/material';

export const LoginAdmin = ({ openForm, OpenLogin, AuthDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLoginAdmin = async () => {
        setIsLoading(true)

        const admin = await getAdmin({
            password,
            email,
        })

        if (admin.status === 200) {
            dispatch(isAuth())
            setIsLoading(false)

            saveData("user", admin.data)
            dispatch(getMember(admin.data))
        }
    }

    function handleForm(e) {
        switch (e.target.id) {
            case "email":
                setEmail(emailValidation(e.target.value))
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                break;
        }
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
                Login (Admin)
            </DialogTitle>
            <DialogContent>
                <Stack sx={{ minWidth: 300, minHeight: 140, marginTop: 1 }} justifyContent='space-between'>
                    <Email form={handleForm} email={email} />
                    <Password
                        showPassword={showPassword}
                        password={password}
                        form={handleForm}
                        handleClick={handleClickShowPassword}
                        fullWidth={true} />
                </Stack>
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
                    handleLoginAdmin();
                }}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}