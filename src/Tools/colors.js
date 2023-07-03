import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const { augmentColor } = createTheme().palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

export const themes = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#1c2566',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main:  purple[500],
      dark: '#ba000d',
      contrastText: '#000',
    },
    lightBtn: createColor('#fff'),
    Tabs: {
      dark: "#121212"
    }
  },
});