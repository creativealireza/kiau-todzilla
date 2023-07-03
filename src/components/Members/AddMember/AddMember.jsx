import { Button } from '@mui/material';
import { useState } from 'react';
import { AddMemberModal } from "./AddMemberModal/AddMemberModal";

export const AddMember = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialog = () => {
        setIsDialogOpen(isDialogOpen => !isDialogOpen)
    }

    return (
        <>
            <Button variant="contained" sx={{ height: '3rem' }} onClick={handleDialog}>Add Member</Button>
            {isDialogOpen && <AddMemberModal dialogStatus={isDialogOpen} handleDialog={handleDialog} />}
        </>
    );
}