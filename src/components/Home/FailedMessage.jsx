import { Typography, CircularProgress } from '@mui/material';

export const FailedMessage = ({ err }) => {
    return (
        <>
            {!err ?
                <>
                    <Typography variant="h4">
                        Nothing to Show 😢
                    </Typography>
                </>
                :
                <>
                    <CircularProgress />
                    <Typography variant="h4">
                        Loading ...
                    </Typography>
                </>
            }
        </>
    )
}