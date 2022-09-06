import { createTheme } from '@mui/material/styles'

const colorPrimary = '#3AF3B1'
const colorPrimaryLight = '#69F8C4'
const colorPrimaryDark = '#09E998'
const colorSecondary = '#E4E7EF'
const colorSecondaryLight = '#FFFFFF'
const colorSecondaryDark = '#B3B6C2'
const colorBackground = '#3A4473'
const fgPrimary = '#E4E7EF'
const fgSecondary = '#A2A6B4'
const iconColor = fgPrimary

const theme = createTheme({
  palette: {
    primary: {
      light: colorPrimaryLight,
      main: colorPrimary,
      dark: colorPrimaryDark,
    },
    secondary: {
      light: colorSecondaryLight,
      main: colorSecondary,
      dark: colorSecondaryDark,
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
            borderBottomColor: fgSecondary,
          },
          '&:after': {
            borderBottomColor: colorSecondaryLight,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        disabled: {
          backgroundColor: '#686E82',
          color: fgSecondary,
        },
      },
    },
  },
})

export default theme
