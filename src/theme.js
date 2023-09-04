import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ac9ecf',
    //   main: '#a9b69c',
    //   main: '#1976d2', // Change this to your desired primary color
    },
    secondary: {
      main: '#a9b69c',
    //   main: '#f50057', // Change this to your desired secondary color
    },
  },
});

export default theme;