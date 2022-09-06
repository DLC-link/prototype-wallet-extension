import React, { FC, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'

interface MessageInputProps {
  onProcess: (message: string) => void
  onCancel?: () => void
}

export const MessageInput: FC<MessageInputProps> = (
  props: MessageInputProps
) => {
  const [messageInput, setMessageInput] = useState('')

  const [canProcess, setCanProcess] = useState(messageInput.length > 0)

  const handleMessageInputChange = (input: string): void => {
    setMessageInput(input)
    setCanProcess(input.length > 0)
  }

  const handleProcessButtonClick = (): void => {
    return props.onProcess(messageInput)
  }

  const handleCancelButtonClick = (): void => {
    if (props.onCancel) props.onCancel()
  }

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex' }}>
      <TextField
        sx={{ backgroundColor: 'white' }}
        multiline
        minRows={20}
        fullWidth
        value={messageInput}
        onChange={(e) => {
          handleMessageInputChange(e.target.value)
        }}
      />
      <Button disabled={!canProcess} onClick={handleProcessButtonClick}>
        Process
      </Button>
      {props.onCancel && (
        <Button onClick={handleCancelButtonClick}>Cancel</Button>
      )}
    </Box>
  )
}
