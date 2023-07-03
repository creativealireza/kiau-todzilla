import {
    CssBaseline,
    Container,
} from '@mui/material';
import {ListOfModifications} from "./ListOfModifications/ListOfModifications";

export const History = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <ListOfModifications />
            </Container>
        </>
    )
}