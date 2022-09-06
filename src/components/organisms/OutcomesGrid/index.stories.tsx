import React from 'react'
import { Container } from '@mui/material'
import OutcomesGrid from '.'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'
import { contracts } from '../../stories-data/contracts'
import { ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Organisms/OutcomesGrid',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
  argTypes: {
    contractNumber: {
      defaultValue: 0,
      control: {
        type: 'number',
        min: 0,
        max: 1,
      },
    },
  },
}

const Template: ComponentStory<typeof OutcomesGrid> = (args: any) => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="lg">
      <OutcomesGrid
        title={'All Contracts'}
        data={contracts[args.contractNumber]}
      />
    </Container>
  </ThemeProvider>
)

export const Display = Template.bind({})
