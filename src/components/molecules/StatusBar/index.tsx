import React, { FC, useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Container,
  createTheme,
  Toolbar,
  Typography,
} from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'
import { useStatusBarContext } from '../../../providers/StatusBar'

import p2plogo from '../../../assets/Bitcoin.svg'
import { BtcDisplay } from '../../atoms/BtcDisplay'

type StatusBarProps = {

}

const StatusBar: FC<StatusBarProps> = (props: StatusBarProps) => {
  const statusBarContext = useStatusBarContext()

  const [balance, setBalance] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getBalance = async (): Promise<void> => {
    setLoading(true)
    await statusBarContext
      .getBalance()
      .then((balance) => setBalance(balance))
      .then(() => setLoading(false))
      .then(() => console.log(isLoading))
  }

  const handleRefresh = (): void => {
    getBalance()
  }

  return (
    <>
        <AppBar position="fixed">
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
                    color: '#f7931a',
                  },
                }}
                size="small"
                loading={isLoading}
                color="secondary"
                variant="text"
                onClick={handleRefresh}
              >
                <Refresh />
              </LoadingButton>
              <BtcDisplay satvalue={balance} currency="BTC" />
            </Container>
            <NewAddressDialog />
          </Toolbar>
        </AppBar>
    </>
  )
}

export default StatusBar
