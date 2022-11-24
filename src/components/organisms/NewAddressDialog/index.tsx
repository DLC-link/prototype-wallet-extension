import * as React from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useAddressContext } from '../../../providers/AddressProvider'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import { IconButton } from '@mui/material'
import { useSnackbar } from '../../../providers/Snackbar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Stack, ThemeProvider } from '@mui/system'

export const NewAddressDialog: FC = () => {
  const addressContext = useAddressContext()
  const [open, setOpen] = React.useState(false)
  const [balance, setBalance] = useState('')

  const snackbar = useSnackbar()

  const handleClickOpen = async (): Promise<void> => {
    setBalance(await addressContext.getNewAddress())
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const copyToClickBoard = (address: string) => {
    navigator.clipboard.writeText(address)
    snackbar.createSnack('Address copied to clipboard!', 'success')
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        size="small"
        color="secondary"
        variant="text"
        onClick={handleClickOpen}
      >
        <ContactEmergencyIcon></ContactEmergencyIcon>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: 'center',
            color: "secondary",
            backgroundColor: "colorBackground",
          }}
        >
          Address to fund the wallet
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography color="fgSecondary" fontSize="10px" gutterBottom>
              {balance}
            </Typography>
            <IconButton size="small" onClick={() => copyToClickBoard(balance)}>
              <ContentCopyIcon color="primary"></ContentCopyIcon>
            </IconButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  )
}
