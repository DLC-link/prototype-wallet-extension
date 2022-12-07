import React from 'react'
import { ContractView } from '.'
import { contracts } from '../../stories-data/contracts'
import { action } from '@storybook/addon-actions'
import { ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Organisms/ContractView',
  parameters: {
    backgrounds: {
      default: 'p2pd',
      values: [{ name: 'p2pd', value: '#303855' }],
    },
  },
  argTypes: {
    availableAmount: {
      defaultValue: 50000,
      control: {
        type: 'number',
        min: 0,
        max: 10000000000,
      },
    },
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

const Template: ComponentStory<typeof ContractView> = (args: any) => (
    <div style={{ width: 1366, height: 768 }}>
      <div style={{ height: '100%' }}>
        <ContractView
          data={contracts[args.contractNumber]}
          acceptContract={action('Accept Contract')}
          rejectContract={action('Reject Contract')}
          cancel={action('Cancel')}
          availableAmount={args.availableAmount}
        />
      </div>
    </div>
)

export const Display = Template.bind({})
