import React, { FC } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  Toolbar,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'

import p2plogo from '../../../assets/dlclinklogo.svg'
import { BtcDisplay } from '../../atoms/BtcDisplay'

type StatusBarProps = {
  balance: number
  isLoading: boolean
  refresh: () => void
}

const colorPrimary = '#f2a900'
const colorSecondary = '#4d4d4e'
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
      primary: colorPrimary,
      secondary: colorSecondary,
    },
    action: {
      active: iconColor,
    },
  },
})

const StatusBar: FC<StatusBarProps> = (props: StatusBarProps) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar>
            <Container sx={{ flex: 1 }}>
              <Box
                component="img"
                sx={{ height: '40px', margin: '12px 0' }}
                src={p2plogo}
                alt="P2P-Derivatives"
              />
            </Container>
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '0.5rem',
              }}
            >
              <LoadingButton
                sx={{
                  marginRight: '0.5rem',
                  '& .MuiLoadingButton-loadingIndicator': {
                    color: "#4d4d4e",
                  },
                }}
                size="small"
                loading={props.isLoading}
                color="secondary"
                variant="text"
                onClick={props.refresh}
              >
                <Refresh />
              </LoadingButton>
              <BtcDisplay satvalue={props.balance} currency="BTC" />
            </Container>
            <NewAddressDialog />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default StatusBar
