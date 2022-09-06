import React, { FC } from 'react'
import {
  AppBar,
  Box,
  Container,
  createTheme,
  IconButton,
  Toolbar,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Refresh } from '@mui/icons-material'

import p2plogo from '../../../assets/dlclinklogo.svg'
import { BtcDisplay } from '../../atoms/BtcDisplay'

type StatusBarProps = {
  balance: number
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
              <IconButton color="secondary" onClick={props.refresh}>
                <Refresh />
              </IconButton>
              <BtcDisplay satvalue={props.balance} currency="BTC" />
            </Container>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default StatusBar
