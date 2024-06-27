// src/theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.5rem',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.5rem',
        },
    },
});

export { lightTheme, darkTheme };
