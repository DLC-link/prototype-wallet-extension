import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif',
    ].join(','),
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&': {
            backgroundColor: '#4d4d4e',
            borderTop: '2px solid rgba(255, 255, 255, 1) !important',
            borderBottom: '2px solid rgba(255, 255, 255, 1) !important',
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#f7931a',
        },
      },
    },
    //@ts-ignore
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f7931a',
        },
      },
      actions: {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'flex-end',
      },
    },
  },
  palette: {
    primary: {
      main: '#4d4d4e',
    },
    secondary: {
      main: '#f7931a',
    },
    background: {
      default: '#f7931a',
      paper: '#4d4d4e',
    },
    text: {
      primary: '#ffffff',
    },
    action: {
      active: '#4d4d4e',
    },
  },
})

export default theme
