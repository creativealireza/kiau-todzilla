import {
    useMediaQuery,
    CssBaseline,
    Container,
    Button,
    Stack,
    Link,
    Box
} from '@mui/material';
import {Authentication} from "../../Authentication/Authentication";
import { themes } from "../../Tools/colors";
import Typewriter from 'typewriter-effect';

export const LandingPage = () => {
    const isSmall = useMediaQuery('(max-width:600px)');

    return (
        <>
            <CssBaseline />
            <Container>
                <Box
                    sx={{
                        minWidth: 100,
                        height: "80vh",
                        borderRadius: 1,
                        margin: '1rem 9%',
                        fontWeight: 700,
                        fontSize: isSmall ? 20 : 25,
                        fontFamily: 'Roboto',
                        background: `linear-gradient(210deg, #fff , ${themes.palette.primary.light} , #C8DBFF , #fff )`
                    }}
                >
                    <Stack sx={{ textAlign: "left", padding: "10rem 10% 0 10%" }}>
                        TodZilla brings all your
                        <Typewriter
                            options={{
                                strings: ['tasks', 'teammates', 'tools'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                        together.
                        <Box>Move fast, stay aligned, and build better.</Box>
                    </Stack>

                    <Box sx={{ display: 'flex', padding: "1rem 0 0 10%" }}>
                        <Button href="/auth" variant="contained" size={isSmall ? 'medium' : 'large'}>
                            Login - It`s free
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>

    )
}