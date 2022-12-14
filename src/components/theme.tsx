import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // typography: {
  //   fontFamily: [
  //     'Noyh Geometric Slim', 'sans-serif',
  //     'Noyh Geometric', 'sans-serif'
  //   ].join(','),
  // },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&': {
            backgroundColor: '#4d4d4e',
            fontSize: '10px',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#4d4d4e',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          fontWeight: 'light',
          color: '#ffffff',
          textAlign: 'center',
          padding: '15px',
        },
        head: {
          fontSize: '10px',
          padding: '5px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#f7931a'
        },
        text: {
          backgroundColor: '#4d4d4e'
        }
      }
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
