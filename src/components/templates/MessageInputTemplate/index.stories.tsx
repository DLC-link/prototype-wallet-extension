import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { action } from '@storybook/addon-actions'
import { ComponentStory } from '@storybook/react'
import ProviderWrapper from '../../../provider'
import { StatusBarProvider } from '../../../providers/StatusBar'
import configureStore from '../../stories-data/createStoriesStore'
import theme from '../../theme'
import MessageInputTemplate from './'

export default {
  title: 'Components/Templates/MessageInputTemplate',
}

const store = configureStore()

const Template: ComponentStory<typeof MessageInputTemplate> = (args: any) => (
  <ProviderWrapper store={store}>
    <div style={{ width: 1366, height: 768 }}>
      <ThemeProvider theme={theme}>
        <StatusBarProvider balanceFn={() => Promise.resolve(50000000)}>
          <MessageInputTemplate
            onProcess={action('onProcess')}
            onCancel={action('onCancel')}
          />
        </StatusBarProvider>
      </ThemeProvider>
    </div>
  </ProviderWrapper>
)

export const Display = Template.bind({})
