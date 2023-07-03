import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    InputLabel,
    Input,
    FormControl,
    FormHelperText,
    InputAdornment,
    IconButton,
} from '@mui/material';

export const Password = ({ form, handleClick, showPassword, password, fullWidth = false }) => {
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <FormControl variant="standard" sx={{ maxWidth: fullWidth ? fullWidth : 195 }} >
            <InputLabel
                error={password ? false : true}
                htmlFor="password">
                Password
            </InputLabel>
            <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                error={password ? false : true}
                onChange={form}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClick}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {!password && <FormHelperText error sx={{}} id="password">Password Required</FormHelperText>}
        </FormControl>
    );
}