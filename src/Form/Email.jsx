import {
    TextField,
} from '@mui/material';

export const Email = ({ form, email }) => {
    return (
        <TextField
            id="email"
            label="Email"
            type="email"
            variant="standard"
            error={email ? false : true}
            helperText={email ? "" : "Enter Email Correctly"}
            sx={{ marginRight: "5px" }}
            onChange={form}
        />
    );
}