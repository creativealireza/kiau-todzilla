import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";

export const Logo = () => {
    return (
        <Button
            variant='text'
            disableRipple
            sx={{
                color: 'white',
                textTransform: "none",
                marginLeft: "0.6rem",

                "&:hover": {
                    backgroundColor: "transparent"
                },
            }}
        >
            <NavLink to={"/"} style={{color: "white", textDecoration: 'none'}}>CA TodZilla</NavLink>
        </Button>
    );
}