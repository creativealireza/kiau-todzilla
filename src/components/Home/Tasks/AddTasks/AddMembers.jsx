import {
    TextField,
    Autocomplete,
    FormControl,
    Avatar,
    Stack
} from '@mui/material';

export const AddMembers = ({ members = [], selectMembers }) => {

    return (
        <FormControl error variant="standard" sx={{ maxWidth: 350, minWidth: "100%", marginTop: "1rem" }}>
            <Autocomplete
                value={selectMembers?.value}
                onChange={(_, newValue) => {
                    selectMembers?.setValue(newValue);
                }}
                multiple
                id="members"
                options={members}
                getOptionLabel={(option) => option.fullName}
                renderOption={(optionKeys, option) => (
                    <Stack {...optionKeys} direction="row" alignItems="center">
                        <Avatar alt={option?.fullName} src={option?.profilePhoto} sx={{ width: "2rem", height: "2rem", marginRight: "1rem" }} />
                        {option?.fullName}
                    </Stack>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Members"
                    />
                )}
            />
        </FormControl>
    );
}