import { useState } from 'react';
import { TasksDialog } from "./TasksDialog";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Link from '@mui/material/Link';
import { readData } from '../../../Tools/localActions';
import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  Typography,
  Divider,
  Tooltip,
  Button,
  Box
} from '@mui/material';

export const CardMember = ({ members }) => {
  const [tasks, setTasks] = useState([]);
  const [openTasksDialog, setOpenTasksDialog] = useState(false);

  function handleTasksDialog(memberId) {
    const tasksList = [];
    userTasks?.map((task, i) => (
      task?.members?.map(taskMember => {
        if (taskMember?.memberId === memberId) tasksList.push(task)
      })))

    setTasks(tasksList)
    setOpenTasksDialog(openTasksDialog => !openTasksDialog)
  }
  const user = readData("user");
  const userTasks = user?.tasks?.filter(task => !task?.isDeleted);

  return (
    <Stack
      sx={{
        margin: '3rem 0',
        display:  "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}>
      {members?.map(member => (
        <Card sx={{ maxWidth: 330, minWidth: 320, margin: "1rem 0.6rem", minHeight: 220 }} key={member?.fullName} raised={true}>
          <CardHeader
            avatar={
              <Avatar src={member?.profilePhoto} alt={member?.fullName} />
            }
            action={
              member?.isAdmin ?
                <Tooltip title="Admin">
                  <SupervisorAccountIcon
                    sx={{ fontSize: "xx-large", margin: "1rem 1rem 0 0" }}
                    color="warning" />
                </Tooltip> :
                <Tooltip title="User">
                  <PersonIcon
                    sx={{ fontSize: "xx-large", margin: "1rem 1rem 0 0" }}
                    color="action" />
                </Tooltip>
            }
            title={member?.fullName}
            subheader={`Age: ${member?.age}`}
          />
          <CardContent>
            <Stack direction="row" justifyContent="flex-start" gap={3}>
              <Stack direction="row" justifyContent="flex-start">
                <Tooltip title="LinkedIn">
                  <Link href={member?.linkedIn} underline="none" target="_blank" rel="noreferrer">
                    <LinkedInIcon
                      fontSize="large"
                      color="primary"
                      sx={{ marginRight: "1rem", cursor: 'pointer' }} />
                  </Link>
                </Tooltip>

                <Tooltip title="Github">
                  <Link href={member?.github} underline="none" target="_blank" rel="noreferrer">
                    <GitHubIcon
                      fontSize="large"
                      sx={{ cursor: 'pointers', color: "rgba(0, 0, 0, 0.8)" }}
                    />
                  </Link>
                </Tooltip>
              </Stack>

              <Divider orientation="vertical" flexItem />

              <Stack direction="row" alignItems='center'>
                <Tooltip title="Language">
                  <TranslateIcon />
                </Tooltip>

                <Typography variant="overline" display="block" sx={{ marginLeft: "0.8rem" }}>
                  {member?.language[0]}
                </Typography>
              </Stack>
            </Stack>


            <Stack direction="row" alignItems="center" margin="1rem 0">
              <Tooltip title="Skills">
                <PsychologyIcon fontSize="large" color="primary" sx={{ marginRight: "0.8rem" }} />
              </Tooltip>
              <Stack direction='row' flexWrap="wrap" >
                {member?.skills
                  ?.map(skill => skill)
                  ?.sort((a, b) => a.title.length - b.title.length)
                  ?.map(skill =>
                    <Chip key={skill?.title} size='small' label={skill?.title} sx={{ borderRadius: "1px", margin: "0.2rem 0.2rem" }} />
                  )}
              </Stack>
            </Stack>

            <Divider variant="middle" sx={{ margin: "1rem 0" }} />

            <Stack direction="row" flexWrap="wrap" alignItems="center" sx={{ marginTop: '1rem' }}>
              {Number(userTasks?.some(task => {
                let sum = 0;
                task?.members?.map(taskMember => {
                  if (taskMember?.memberId === member?.memberId) sum += 1;
                })
                return sum;
              })) === 0 ? <Box>This Member has no tasks.</Box> :
                <Button
                  variant="outlined"
                  startIcon={<AssignmentOutlinedIcon fontSize="large" color="primary" sx={{ marginRight: '0.8rem' }} />}
                  onClick={() => handleTasksDialog(member?.memberId)}
                  sx={{ width: "100%" }}>
                  VIEW TASKS
                </Button>}

              {openTasksDialog &&
                <TasksDialog
                  open={openTasksDialog}
                  handleTasksDialog={handleTasksDialog}
                  tasks={tasks} />}
            </Stack>
          </CardContent>
        </Card>))}
    </Stack>
  );
}