import * as React from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useAddressContext } from '../../../providers/AddressProvider'

export const NewAddressDialog: FC = () => {
  const addressContext = useAddressContext()
  const [open, setOpen] = React.useState(false)
  const [balance, setBalance] = useState('')

  const handleClickOpen = async (): Promise<void> => {
    setBalance(await addressContext.getNewAddress())
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Get receiving address
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{ textAlign: "center" }}>Address to fund the wallet</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{balance}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}
