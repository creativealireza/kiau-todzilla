import { Typography, CircularProgress, Box } from '@mui/material';

export const Loading = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", height: "60vh" }}>
            <CircularProgress />
            <Typography variant="h4" sx={{ marginLeft: "1rem" }}>
                Loading ...
            </Typography>
        </Box>
    )
}