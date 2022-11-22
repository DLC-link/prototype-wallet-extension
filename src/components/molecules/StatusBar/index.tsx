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
import { fontFamily, height } from '@mui/system'

type StatusBarProps = {
  balance: number
  isLoading: boolean
  refresh: () => void
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#69F8C4',
      main: '#303855',
      dark: '#09E998',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#E4E7EF',
      dark: '#B3B6C2',
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
                    color: 'white',
                  },
                }}
                size="small"
                loading={props.isLoading}
                color="inherit"
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
