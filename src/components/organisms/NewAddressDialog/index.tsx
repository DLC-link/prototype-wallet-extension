import * as React from 'react'
import Button from '@mui/material/Button'
import { FC } from 'react'
import { useAddressContext } from '../../../providers/AddressProvider'
import { useSnackbar } from '../../../providers/Snackbar'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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
        size="small"
        color="secondary"
        variant="text"
        onClick={() => copyToClickBoard()}
      >
        <AccountBalanceWalletIcon color="secondary"></AccountBalanceWalletIcon>
      </Button>
    </>
  )
}
