import { useState, useEffect } from 'react';
import {
    TextField,
    Autocomplete,
    FormHelperText,
    FormControl
} from '@mui/material';
import { getAllLanguages } from "../API/API"

export const Language = ({ selectedLanguages, customStyle }) => {
    const [languages, setLanguages] = useState([]);


    useEffect(() => {
        getAllLanguages().then(countries =>
            setLanguages(
                [...new Set(countries?.map(lang => lang.languages && Object.values(lang.languages)[0]))]
                    .filter(lan => lan !== undefined)
                    .filter(lan => lan.length <= 15)
            )
        );
    }, [])

    return (
        <FormControl error={!!selectedLanguages?.value?.length} variant="standard" sx={[{ maxWidth: 300, minWidth: "100%" }, customStyle]}>
            <Autocomplete
                value={selectedLanguages?.value}
                multiple
                id="languages"
                aria-describedby="languages-error"
                options={languages}
                getOptionLabel={(option) => {
                    if (option)
                        return option
                }}
                onChange={(_, newValue) => {
                    selectedLanguages?.setValue?.(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Language"
                        placeholder={selectedLanguages?.value?.length > 0 ? "" : "Farsi, English, ..."}
                        InputLabelProps={{ className: !!selectedLanguages?.value?.length ? 'textField_label_primary' : "textField_label_danger" }}
                    />
                )}
            />
            <FormHelperText id="languages-error" sx={{color: !!selectedLanguages?.value?.length ? "" : "rgb(211, 47, 47)"}}>
                {selectedLanguages?.value?.length > 1 ? "Choose Only one language" : selectedLanguages?.value?.length === 0 ? "Choose your language" : ""}
            </FormHelperText>
        </FormControl>
    );
}