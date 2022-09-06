import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { MessageInput } from '../../organisms/MessageInput'
import MainLayout from '../../organisms/MainLayout'

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
      <MainLayout>
        <MessageInput onProcess={props.onProcess} onCancel={props.onCancel} />
      </MainLayout>
    </Box>
  )
}

export default MessageInputTemplate
