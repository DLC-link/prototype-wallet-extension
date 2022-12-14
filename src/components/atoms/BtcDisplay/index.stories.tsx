// import React from 'react'
// import { BtcDisplay } from '.'
// import { ThemeProvider } from '@mui/material/styles'
// import theme from '../../theme'
// import { ComponentStory } from '@storybook/react'

// export default {
//   title: 'Components/Atoms/BtcDisplay',
//   parameters: {
//     backgrounds: {
//       default: 'p2pd',
//       values: [{ name: 'p2pd', value: '#303855' }],
//     },
//   },
//   argTypes: {
//     satValue: {
//       defaultValue: 50000,
//       control: {
//         type: 'number',
//         min: -10000000000,
//         max: 10000000000,
//       },
//     },
//     pnlColors: {
//       defaultValue: false,
//       control: {
//         type: 'boolean',
//       },
//     },
//     currency: {
//       defaultValue: 'BTC',
//       control: {
//         type: 'select',
//         options: ['BTC', 'sats'],
//       },
//     },
//   },
// }

// const Template: ComponentStory<typeof BtcDisplay> = (args: any) => (
//   <ThemeProvider theme={theme}>
//     <BtcDisplay
//       satvalue={args.satValue}
//       pnlcolors={args.pnlColors}
//       currency={args.currency}
//     />
//   </ThemeProvider>
// )

// export const Display = Template.bind({})
