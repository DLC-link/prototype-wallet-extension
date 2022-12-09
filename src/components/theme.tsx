import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      'TT Hoves Pro Trial',
      'sans-serif',
      'TT Hoves Pro Trial Variable',
      'sans-serif',
      'TT Hoves Pro',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&': {
            backgroundColor: '#4d4d4e',
            // borderTop: '4px solid rgba(255, 255, 255, 1) !important',
            // borderBottom: '4px solid rgba(255, 255, 255, 1) !important',
            fontSize: '10px'
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '&': {
            backgroundColor: '#f7931a',
            fontSize: '12px',
            fontWeight: 'light',
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
