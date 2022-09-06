import React, { ReactElement } from 'react'
import MainLayout from './'
import { ThemeProvider } from '@mui/material/styles'
import { action } from '@storybook/addon-actions'
import theme from '../../theme'
import configureAppStore from '../../stories-data/createStoriesStore'
import ProviderWrapper from '../../../provider'
import { StatusBarProvider } from '../../../providers/StatusBar'

export default {
  title: 'Components/Organisms/MainLayout',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
}

const store = configureAppStore()

export const mainLayout = (): ReactElement => (
  <ProviderWrapper store={store}>
    <ThemeProvider theme={theme}>
      <StatusBarProvider balanceFn={() => Promise.resolve(500000)}>
        <div style={{ height: 1366, width: 768, display: 'flex' }}>
          <MainLayout onBack={action('onBack')}>
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <p>TEST CONTENT</p>
            </div>
          </MainLayout>
        </div>
      </StatusBarProvider>
    </ThemeProvider>
  </ProviderWrapper>
)
