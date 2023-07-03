import { useState } from "react";
import { emailValidation } from "../../Tools/emailValidation";
import { UploadProfileImage } from "../../Form/UploadProfileImage";
import { Password } from "../../Form/Password";
import { Email } from "../../Form/Email";
import { SearchSkills } from "../../Form/Skills/SearchSkills";
import { Language } from "../../Form/Language";
import { NotificationSnackbar } from "../../Form/NotificationSnackbar";
import { newAdmin } from "../../API/API";
import { splitFullName } from "../../Tools/splitFullName";
import { saveData } from "../../Tools/localActions";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuth } from '../authSlice';
import { getMember } from '../../components/Members/MembersSlice';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Box,
    LinearProgress
} from '@mui/material';

export const SignUp = ({ openForm, OpenSignUp, AuthDialog }) => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [linkedIn, setLinkedIn] = useState("")
    const [fullName, setFullName] = useState("");
    const [github, setGithub] = useState("")
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [skills, setSkills] = useState([])
    const [language, setLanguage] = useState([])
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isAdminCreated, setIsAdminCreated] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleNewAdmin = async () => {
        setIsLoading(true)

        const admin = await newAdmin({
            fullName: splitFullName(fullName).fullName,
            firstName: splitFullName(fullName).firstName,
            lastName: splitFullName(fullName).lastName,
            password,
            age,
            email,
            github,
            linkedIn,
            skills,
            language,
            profilePhoto,
            members: [],
            isAdmin: true
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
            case "fullName":
                setFullName(e.target.value)
                break;
            case "age":
                setAge(e.target.value)
                break;
            case "github":
                setGithub(e.target.value)
                break;
            case "linkedIn":
                setLinkedIn(e.target.value)
                break;
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
                    "" : OpenSignUp()}>
            {isLoading && <LinearProgress />}
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter Your Info
                </DialogContentText>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "49% 49%",
                        gap: "2%",
                        margin: "1rem 0"
                    }}>
                    <TextField
                        autoFocus
                        id="fullName"
                        label="Full Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={fullName.trim().split(" ").length >= 2 ? false : true}
                        helperText={fullName.trim().split(" ").length >= 2 ? "" : "Enter your Full Name"}
                        onChange={handleForm}
                    />
                    <TextField
                        id="age"
                        label="Age"
                        type="number"
                        fullWidth={false}
                        variant="standard"
                        error={age >= 16 && age <= 50 ? false : true}
                        helperText={age >= 16 && age <= 50 ? "" : "(16 <= Age <= 50)"}
                        onChange={handleForm}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "49% 49%",
                        gap: "2%",
                        margin: "1rem 0"
                    }}>
                    <Email form={handleForm} email={email} />

                    <Password
                        showPassword={showPassword}
                        password={password}
                        form={handleForm}
                        handleClick={handleClickShowPassword} />

                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "49% 49%",
                        gap: "2%",
                        marginTop: "1rem"
                    }}>
                    <TextField
                        margin="dense"
                        id="github"
                        label="Github"
                        type="text"
                        variant="standard"
                        sx={{ marginRight: "5px" }}
                        error={github ? false : true}
                        helperText={github ? "" : "Github username"}
                        onChange={handleForm}
                    />
                    <TextField
                        margin="dense"
                        id="linkedIn"
                        label="LinkedIn"
                        type="text"
                        variant="standard"
                        error={linkedIn ? false : true}
                        helperText={linkedIn ? "" : "LinkedIn username"}
                        onChange={handleForm}
                    />
                </Box>

                <Stack margin="1rem 0">
                    <SearchSkills skillsArray={{ value: skills, setValue: setSkills }} />
                    <Language selectedLanguages={{ value: language, setValue: setLanguage }} customStyle={{ margin: "1rem 0" }} />
                </Stack>

                <UploadProfileImage
                    profilePhoto={{ value: profilePhoto, setValue: setProfilePhoto }}
                    imagePreview={{ value: imagePreview, setValue: setImagePreview }} />
            </DialogContent>
            <DialogActions>
                <Button
                    to="/auth"
                    component={Link}
                    onClick={() => {
                        OpenSignUp();
                        AuthDialog();
                    }}>
                    Back
                </Button>
                <Button
                    disabled={
                        !(skills.length >= 2 && skills.length <= 5) ||
                        !(language.length === 1) ||
                        !Boolean(linkedIn) || !Boolean(github) ||
                        !Boolean(email) || !Boolean(password) ||
                        !(fullName.trim().split(" ").length >= 2) ||
                        !(age >= 16 && age <= 50)
                    }
                    onClick={() => {
                        handleNewAdmin();
                    }}>
                    Sign Up
                </Button>
            </DialogActions>
            {isAdminCreated &&
                <NotificationSnackbar
                    closeSnack={{ value: !!isAdminCreated, setValue: setIsAdminCreated }}
                    message={"Admin Created Successfully!"} />}
        </Dialog>
    );
}