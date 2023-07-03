import { useState } from 'react';
import { skills } from "./skills";
import {
    TextField,
    Autocomplete,
    FormControl,
    FormHelperText
} from '@mui/material';

export const SearchSkills = ({ skillsArray }) => {
    return (
        <FormControl error variant="standard" sx={{ maxWidth: 400, minWidth: "100%" }}>
            <Autocomplete
                value={skillsArray?.value}
                onChange={(_, newValue) => {
                    skillsArray?.setValue(newValue);
                }}
                multiple
                id="skills"
                aria-describedby="skills-error"
                options={skills}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Skills"
                        placeholder={skillsArray?.value?.length > 0 ? "" : "ReactJs, ..."}
                        InputLabelProps={{ className: skillsArray?.value?.length ? 'textField_label_primary' : "textField_label_danger" }}
                    />
                )}
            />
            <FormHelperText id="skills-error">
                {skillsArray?.value?.length > 5 || skillsArray?.value?.length < 2 ? "(2 <= Skills <= 5)" : ""}
            </FormHelperText>
        </FormControl>
    );
}

