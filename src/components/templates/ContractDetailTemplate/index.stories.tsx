// import React from 'react'
// import { ThemeProvider } from '@mui/material/styles'
// import { action } from '@storybook/addon-actions'
// import { ComponentStory } from '@storybook/react'
// import ProviderWrapper from '../../../provider'
// import { StatusBarProvider } from '../../../providers/StatusBar'
// import { contracts } from '../../stories-data/contracts'
// import configureStore from '../../stories-data/createStoriesStore'
// import theme from '../../theme'
// import ContractDetailTemplate from './'

// export default {
//   title: 'Components/Templates/ContractDetailTemplate',
//   argTypes: {
//     contractNumber: {
//       defaultValue: 0,
//       control: {
//         type: 'number',
//         min: 0,
//         max: 1,
//       },
//     },
//   },
// }

// const store = configureStore()

// const Template: ComponentStory<typeof ContractDetailTemplate> = (args: any) => (
//   <ProviderWrapper store={store}>
//     <div style={{ width: 1366, height: 768 }}>
//       <ThemeProvider theme={theme}>
//         <StatusBarProvider balanceFn={() => Promise.resolve(50000000)}>
//           <ContractDetailTemplate
//             data={contracts[args.contractNumber]}
//             acceptContract={action('Accept Contract')}
//             rejectContract={action('Reject Contract')}
//             cancel={action('Cancel')}
//             availableAmount={50000000}
//           />
//         </StatusBarProvider>
//       </ThemeProvider>
//     </div>
//   </ProviderWrapper>
// )

// export const Display = Template.bind({})
