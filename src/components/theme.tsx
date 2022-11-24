import { createTheme } from '@mui/material/styles'


const colorPrimary = '#f2a900'
const colorSecondary = '#ffffff'
const colorBackground = '#ffffff'
const fgPrimary = '#ffffff'
const fgSecondary = '#4d4d4e'
const iconColor = '#ffffff'

const theme = createTheme({
  palette: {
    primary: {
      main: colorPrimary,
    },
    secondary: {
      main: colorSecondary,
    },
    background: {
      default: colorBackground,
      paper: colorBackground,
    },
    text: {
      primary: fgPrimary,
      secondary: fgSecondary,
    },
    action: {
      active: iconColor,
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: colorPrimary,
          },
          '&:after': {
            borderBottomColor: colorSecondary,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        disabled: {
          backgroundColor: colorBackground,
          color: fgPrimary,
        },
      },
    },
  },
})

export default theme
