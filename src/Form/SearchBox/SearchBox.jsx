import * as React from 'react';
import { Paper, InputBase, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export const SearchBox = ({searchValue}) => {
    const smMargin = useMediaQuery('(max-width : 475px)');
    const smWidth = useMediaQuery('(max-width : 730px)');

    return (
        <Paper
            component="form"
            sx={{
                p: '1px 4px',
                display: 'flex',
                alignItems: 'center',
                width: smWidth ? 250 : 500,
                marginTop: smMargin ? "1rem" : ""
            }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search Members"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(e) => searchValue(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}