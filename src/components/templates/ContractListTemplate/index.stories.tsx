// import React, { ReactElement } from 'react'
// import ContractListTemplate from './'
// import { ThemeProvider } from '@mui/material/styles'
// import theme from '../../theme'
// import { contracts } from '../../stories-data/contracts'
// import { action } from '@storybook/addon-actions'
// import ProviderWrapper from '../../../provider'
// import configureStore from '../../stories-data/createStoriesStore'
// import { StatusBarProvider } from '../../../providers/StatusBar'
// import { AddressProvider } from '../../../providers/AddressProvider'

// export default {
//   title: 'Components/Templates/ContractListTemplate',
// }

// const store = configureStore()

// export const contractList = (): ReactElement => (
//   <ProviderWrapper store={store}>
//     <ThemeProvider theme={theme}>
//       <AddressProvider
//         addressFn={() =>
//           Promise.resolve('bc1qckczfn69arnk6ldzy5t2gr9eq0trf2n9khftlr')
//         }
//       >
//         <StatusBarProvider balanceFn={() => Promise.resolve(500000)}>
//           <div style={{ width: 1366, height: 768 }}>
//             <ContractListTemplate
//               data={contracts}
//               onContractClicked={action('onContractClicked')}
//               onAcceptOfferClicked={action('onAcceptOfferClicked')}
//             />
//           </div>
//         </StatusBarProvider>
//       </AddressProvider>
//     </ThemeProvider>
//   </ProviderWrapper>
// )
