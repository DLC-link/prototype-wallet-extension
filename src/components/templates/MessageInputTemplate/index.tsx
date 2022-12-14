import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { MessageInput } from '../../organisms/MessageInput'

type MessageInputTemplateProps = {
  onProcess: (message: string) => void
  onCancel?: () => void
}

const MessageInputTemplate: FC<MessageInputTemplateProps> = (
  props: MessageInputTemplateProps
) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#303855',
      }}
    >
        <MessageInput onProcess={props.onProcess} onCancel={props.onCancel} />
    </Box>
  )
}

export default MessageInputTemplate
