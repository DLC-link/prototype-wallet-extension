import React, { ReactElement } from 'react'
import { MessageInput } from './'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Organisms/MessageInput',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
}

export const sampleMessageInput = (): ReactElement => (
  <ThemeProvider theme={theme}>
    <div style={{ width: 700, height: 768 }}>
      <div style={{ height: '100%' }}>
        <MessageInput
          onProcess={action('onProcess')}
          onCancel={action('onCancel')}
        />
      </div>
    </div>
  </ThemeProvider>
)
