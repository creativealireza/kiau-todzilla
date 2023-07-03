import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Button,
    Stack,
    Avatar,
    FormControl,
    FormHelperText
} from '@mui/material';

export const UploadProfileImage = ({profilePhoto, imagePreview }) => {
    const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleProfileImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        profilePhoto?.setValue(base64);
        imagePreview?.setValue(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <FormControl variant="standard" sx={{ display: "flex", alignItems: "center" }}>
            <Button
                variant="outlined"
                component="label"
                sx={{
                    color: "black",
                    border: "black",
                    margin: "0 auto",
                    marginTop: "1.6rem",

                    '&:hover': {
                        borderColor: 'black',
                        background: "rgb(0 0 0 / 10%)"
                    }
                }}
                aria-describedby="profilePictureInfo"
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <PhotoCamera sx={{ marginRight: "0.4rem", color: "gray" }} />
                    {imagePreview?.value ? "Change Photo" : "Upload Photo"}
                    {imagePreview?.value && <Avatar alt="Remy Sharp" src={imagePreview?.value} />}
                </Stack>
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfileImage}
                />
            </Button>
            {!imagePreview?.value && <FormHelperText id="profilePictureInfo">
                Upload your image or leave for default
            </FormHelperText>}
        </FormControl>
    );
}