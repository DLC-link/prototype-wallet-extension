import React, { FC } from 'react'
import {
  AppBar,
  Box,
  Container,
  createTheme,
  Toolbar,
} from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'

import p2plogo from '../../../assets/Bitcoin.svg'
import { BtcDisplay } from '../../atoms/BtcDisplay'

type StatusBarProps = {
  balance: number
  isLoading: boolean
  refresh: () => void
}

const StatusBar: FC<StatusBarProps> = (props: StatusBarProps) => {
  return (
    <div>
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
                    color: "#f7931a",
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
    </div>
  )
}

export default StatusBar
