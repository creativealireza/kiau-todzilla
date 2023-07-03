import { useState } from "react";
import { newMembers } from "../../../../API/API";
import { SearchSkills } from "../../../../Form/Skills/SearchSkills";
import { Language } from "../../../../Form/Language";
import { splitFullName } from "../../../../Tools/splitFullName";
import { UploadProfileImage } from "../../../../Form/UploadProfileImage";
import { newMember } from "../../MembersSlice";
import { useDispatch, useSelector } from 'react-redux';
import { readData, updateKeyObject } from "../../../../Tools/localActions";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  Box
} from '@mui/material';

export const AddMemberModal = ({ dialogStatus, handleDialog }) => {
  const admin = useSelector((state) => state.members)
  const adminId = admin[0]?.adminId ? admin[0]?.adminId : readData("user")?.adminId;

  const [imagePreview, setImagePreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [github, setGithub] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [skills, setSkills] = useState([])
  const [language, setLanguage] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleNewMember = async () => {
    setIsLoading(true);

    const member = await newMembers({
      fullName: splitFullName(fullName).fullName,
      firstName: splitFullName(fullName).firstName,
      lastName: splitFullName(fullName).lastName,
      age,
      github,
      linkedIn,
      skills,
      language,
      profilePhoto,
      adminId,
      isAdmin: false
    })

    if (member.status === 200) {
      dispatch(newMember(member.data))
      updateKeyObject("user", "members", member?.data?.members)

      setIsLoading(false)
      handleDialog();
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
      default:
        break;
    }
  }

  return (
    <div>
      <Dialog open={dialogStatus} onClose={handleDialog}>
        {isLoading && <LinearProgress />}
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill The Inputs With Great Care.
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
          <Button onClick={handleDialog}>Cancel</Button>
          <Button
            disabled={
              !(skills.length >= 2 && skills.length <= 5) ||
              !(language.length === 1) ||
              !Boolean(linkedIn) || !Boolean(github) ||
              !(fullName.trim().split(" ").length >= 2) ||
              !(age >= 16 && age <= 50)
            }
            onClick={() => {
              handleNewMember();
            }}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}