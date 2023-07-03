import { useState } from 'react';
import { SignUp } from "./SignUp/SignUp";
import { LoginVisitor } from "./Login/LoginVisitor";
import { LoginAdmin } from "./Login/LoginAdmin";
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import {
    Button,
    Stack,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider
} from '@mui/material';

export const Authentication = ({ isAuth, setMainAuthDialog }) => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLoginVisitor, setOpenLoginVisitor] = useState(false);
    const [openLoginAdmin, setOpenLoginAdmin] = useState(false);
    const [authDialog, setAuthDialog] = useState(isAuth);

    const handleOpenSignUp = () => setOpenSignUp(openSignUp => !openSignUp);
    const OpenLoginVisitor = () => setOpenLoginVisitor(openLoginVisitor => !openLoginVisitor);
    const OpenLoginAdmin = () => setOpenLoginAdmin(openLoginVisitor => !openLoginVisitor);
    const handleAuthDialog = () => setAuthDialog(authDialog => !authDialog);

    const navigate = useNavigate();

    return (
        <>
            <Dialog
                open={authDialog}
                onClose={(_, reason) =>
                    reason === 'backdropClick' || reason === 'escapeKeyDown' ?
                        "" : handleAuthDialog()}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                disableEscapeKeyDown

            >
                <DialogTitle>
                    Welcome
                </DialogTitle>
                <DialogContent sx={{ minWidth: 350 }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        Login
                    </DialogContentText>

                    <Stack justifyContent='space-evenly' sx={{ margin: "0.6rem 0", minHeight: "6rem" }}>
                        <Button
                            variant="contained"
                            to="/loginVisitor"
                            component={Link}
                            onClick={() => {
                                OpenLoginVisitor();
                                handleAuthDialog();
                            }}>
                            as Visitor
                        </Button>
                        <Button
                            variant="contained"
                            to="/loginAdmin"
                            component={Link}
                            onClick={() => {
                                OpenLoginAdmin();
                                handleAuthDialog();
                            }}>
                            as  Admin
                        </Button>
                    </Stack>

                    <DialogContentText id="alert-dialog-slide-description">
                        Sign Up
                    </DialogContentText>

                    <Stack>

                        <Button
                            variant="contained"
                            to="/newAdmin"
                            component={Link}
                            onClick={() => {
                                handleOpenSignUp();
                                handleAuthDialog();
                            }}
                            sx={{ margin: "0.6rem 0" }}
                        >
                            as Admin
                        </Button>

                        <Divider />

                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIosNewIcon />}
                            onClick={() => {
                                setMainAuthDialog(false)
                                navigate("")
                            }}
                            sx={{marginTop: "0.4rem"}}>
                            Back
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            {openSignUp && <SignUp openForm={openSignUp} OpenSignUp={handleOpenSignUp} AuthDialog={handleAuthDialog} />}
            {openLoginVisitor && <LoginVisitor openForm={openLoginVisitor} OpenLogin={OpenLoginVisitor} AuthDialog={handleAuthDialog} />}
            {openLoginAdmin && <LoginAdmin openForm={openLoginAdmin} OpenLogin={OpenLoginAdmin} AuthDialog={handleAuthDialog} />}
        </>
    );
}