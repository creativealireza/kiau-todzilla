import { Button, Stack, useMediaQuery } from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';
import { themes } from "../../../Tools/colors";

export const TotalTasks = ({total}) => {
    const textVisibility = useMediaQuery('(max-width : 500px)');

    return (
        <Stack alignSelf="flex-start">
            <Button
                disableRipple
                variant="contained"
                disabled
                startIcon={<FunctionsIcon />}
                sx={{
                    textTransform: "none",
                    height: textVisibility && '38px',

                    "&:disabled": {
                        backgroundColor: `${themes.palette.secondary.main}`,
                        color: "white"
                    }
                }}
            >
                {!textVisibility && `Total Tasks:`} {total}
            </Button>
        </Stack>
    );
}
