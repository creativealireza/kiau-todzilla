import { Typography, CircularProgress, Box } from '@mui/material';

export const Loading = ({ isLoadingData }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", height: "60vh" }}>
            {isLoadingData ?
                <>
                    <CircularProgress />
                    <Typography variant="h4" sx={{ marginLeft: "1rem" }}>
                        Loading ...
                    </Typography>
                </>
                :
                <Typography variant="h4">
                    No History Yet!
                </Typography>

            }
        </Box>
    )
}