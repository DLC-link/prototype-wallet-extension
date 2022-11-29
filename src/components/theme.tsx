import { createTheme } from '@mui/material/styles'

const colorPrimary = '#f2a900'
const colorSecondary = '#4d4d4e'
const colorTextPrimary = '#ffffff'
const colorTextSecondary = '#4d4d4e'
const colorBackground = '#ffffff'
const iconColor = '#4d4d4e'

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
      primary: colorTextPrimary,
      secondary: colorTextSecondary,
    },
    action: {
      active: iconColor,
    },
  },
})

export default theme;
