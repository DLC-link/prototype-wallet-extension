import React, { FC, useState, useEffect } from 'react'
import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'
import { useStatusBarContext } from '../../../providers/StatusBar'
import p2plogo from '../../../assets/Bitcoin.svg'
import { BtcDisplay } from '../../atoms/BtcDisplay'

type StatusBarProps = {}

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
      .then((balance) => {
        setBalance(balance)
        console.log('Current Balance: ', balance)
      })
      .then(() => setLoading(false))
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
              sx={{ height: '45px', padding: '10px' }}
              src={p2plogo}
              alt="P2P-Derivatives"
            />
          </Container>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            <LoadingButton
              sx={{
                '& .MuiLoadingButton-loadingIndicator': {
                  color: '#f7931a',
                  width: '15px',
                },
              }}
              loading={isLoading}
              onClick={handleRefresh}
              loadingPosition="start"
              startIcon={<Refresh sx={{ color: '#f7931a' }} />}
            ></LoadingButton>
            <BtcDisplay satValue={balance} currency="BTC" />
          </Container>
          <NewAddressDialog />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default StatusBar
