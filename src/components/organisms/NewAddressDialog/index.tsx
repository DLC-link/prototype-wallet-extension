import * as React from 'react'
import Button from '@mui/material/Button'
import { FC } from 'react'
import { useAddressContext } from '../../../providers/AddressProvider'
import { useSnackbar } from '../../../providers/Snackbar'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { Typography } from '@mui/material'

export const NewAddressDialog: FC = () => {
  const addressContext = useAddressContext()

  const snackbar = useSnackbar()

  const copyToClickBoard = async () => {
    navigator.clipboard.writeText(await addressContext.getNewAddress())
    snackbar.createSnack('Wallet Address copied to clipboard!', 'success')
  }

  return (
    <>
      <Button
        sx={{ height: '40px', width: '120px' }}
        color="secondary"
        variant="contained"
        onClick={() => copyToClickBoard()}
      >
        <Typography
          sx={{
            fontSize: '12px',
            color: '#ffffff',
            fontWeight: 'normal',
            lineHeight: '10px',
            padding: '1px',
          }}
        >
          WALLET ADDRESS
        </Typography>
      </Button>
    </>
  )
}
