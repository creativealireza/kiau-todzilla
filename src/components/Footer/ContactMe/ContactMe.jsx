import { Button } from '@mui/material';
import { Link } from '@mui/material';

export const ContactMe = () => {
    return (
        <Button
            variant='text'
            disableRipple
            sx={{
                color: 'white',
                textTransform: "none",
                marginLeft: "0.6rem",
                margin: "0 auto",
                "&:hover": {
                    backgroundColor: "transparent"
                },
            }}
        >
            Find me everywhere via
            <Link href="https://t.me/creativealireza" underline="none" 
                sx={{color: 'white', marginLeft: "0.2rem"}}>
                @CREATIVEALIREZA
            </Link>

        </Button>
    );
}