import { Typography, CircularProgress } from '@mui/material';

export const FailedMessage = ({ err }) => {
    return (
        <>
            {!err ?
                <>
                    <Typography variant="h4">
                        Nothing to Show 😢
                    </Typography>
                    <Typography variant="subtitle1">
                        add a task or try harder 😐
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