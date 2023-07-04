import { useState, useEffect } from "react";
import { SearchBox } from "../../Form/SearchBox/SearchBox";
import { AddMember } from "./AddMember/AddMember";
import { CardMember } from "./CardMember/CardMember";
import { useSelector } from 'react-redux';
import { readData } from "../../Tools/localActions";
import {
    CssBaseline,
    Container,
    Stack,
} from '@mui/material';

export const Members = () => {
    const membersObj = useSelector((state) => state.members)

    const [search, setSearch] = useState("");
    const [members, setmembers] = useState();

    useEffect(() => {
        setmembers(membersObj?.at(0)?.members?.length ? membersObj?.at(0)?.members : readData("user")?.members)
    }, [membersObj])

    return (
        <>
            <CssBaseline />
            <Container>
                <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                        <AddMember />
                        <SearchBox searchValue={setSearch} />
                    </Stack>
                    {members &&
                        <CardMember
                            members={members} />}
                </Stack>
            </Container>
        </>
    )
}