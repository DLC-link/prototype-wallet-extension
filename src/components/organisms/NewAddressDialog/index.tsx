import * as React from 'react'
import Button from '@mui/material/Button'
import { FC } from 'react'
import { useSnackbar } from '../../../providers/Snackbar'
import { Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { BitcoinJSWallet } from 'dlc-lib'
import { ElectrsBlockchain } from 'dlc-lib'
import Config from '../../../config'
import { LocalRepository } from '../../../persistence/localRepository'

const storage = new LocalRepository()
const blockchain = new ElectrsBlockchain(Config.bitcoinWalletApi)
const wallet = new BitcoinJSWallet(storage, Config.network, blockchain)

export const NewAddressDialog: FC = () => {
  const snackbar = useSnackbar()

  const copyToClickBoard = async () => {
    const newAddress = await wallet.getNewAddress();
    navigator.clipboard.writeText(newAddress)
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
        <ContentCopyIcon
          sx={{ height: '16px', color: '#ffffff', padding: '1px' }}
        ></ContentCopyIcon>
      </Button>
    </>
  )
}
