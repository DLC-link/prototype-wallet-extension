import React from 'react'
import { Tabs, TabItem } from '.'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'
import { ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Molecules/Tabs',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
  argTypes: {
    tabNumber: {
      defaultValue: 1,
      control: {
        type: 'number',
        min: 0,
        max: 3,
      },
    },
  },
}

const items: TabItem[] = [
  { label: 'All' },
  { label: 'Approved' },
  { label: 'Confirmed' },
  { label: 'Requested' },
]

const Template: ComponentStory<typeof Tabs> = (args: any) => (
  <ThemeProvider theme={theme}>
    <Tabs
      items={items}
      value={args.tabNumber}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onTabChange={(): void => {}}
    />
  </ThemeProvider>
)

export const Display = Template.bind({})
