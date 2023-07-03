import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const TasksList = React.memo(
    ({ tasks }) => {
        return (
            <List sx={{ maxHeight: 300 }}>
                {tasks?.map((task, i) => (<ListItem>
                    {task?.isCompleted ? <CheckCircleOutlineIcon color="success"/> : <LoopIcon  color="primary"/>}
                    <ListItemText
                        primary={task.title}
                        sx={{ marginLeft: "0.4rem" }}
                    />
                </ListItem>))}
            </List>
        );
    }
);