import { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../../Authentication/authSlice'
import { resetMember } from '../../Members/MembersSlice';
import { removeData, readData } from "../../../Tools/localActions";
import { useNavigate } from "react-router-dom";
import {
    IconButton,
    Link,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from '@mui/material';

export const ProfileNav = ({setAuthDialog, auth}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [adminArray, setAdminArray] = useState({});
    
    const user = readData("user");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const open = Boolean(anchorEl);

    const adminProfile = useSelector((state) => state.members)

    useEffect(() => {
        setAdminArray(adminProfile[0]);
    }, [adminProfile])

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="caption" display="block" sx={{ marginTop: "0.5rem" }}>
                    {adminArray?.adminId ? adminArray?.firstName : user?.firstName}
                </Typography>

                <IconButton
                    disableRipple 
                    disabled={auth ? false : true}
                    color="primary"
                    aria-label="profile-picture"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    component="label"
                    onClick={handleClick}
                >
                    <PersonIcon
                        sx={{
                            color: 'white',
                            margin: "0 0.6rem",

                            "&:hover": {
                                backgroundColor: "transparent"
                            },
                        }}
                    />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {user?.isAdmin &&
                    <Box>
                        <MenuItem>
                            <Avatar src={adminArray?.profilePhoto || user?.profilePhoto} />
                            Profile
                        </MenuItem>

                        <Divider />
                    </Box>
                }

                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(logOut());
                        dispatch(resetMember());
                        removeData("user");
                        navigate("/");
                        setAuthDialog(false);
                    }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}