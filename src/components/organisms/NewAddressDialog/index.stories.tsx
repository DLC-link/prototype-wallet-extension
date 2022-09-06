import React from 'react'
import { Container } from '@mui/material'
import { NewAddressDialog } from '.'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'
import { ComponentStory } from '@storybook/react'
import { AddressProvider } from '../../../providers/AddressProvider'

export default {
  title: 'Components/Organisms/NewAddressDialog',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
}

const Template: ComponentStory<typeof NewAddressDialog> = (args: any) => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="lg">
      <AddressProvider
        addressFn={() =>
          Promise.resolve('bc1qckczfn69arnk6ldzy5t2gr9eq0trf2n9khftlr')
        }
      >
        <NewAddressDialog />
      </AddressProvider>
    </Container>
  </ThemeProvider>
)

export const Display = Template.bind({})
