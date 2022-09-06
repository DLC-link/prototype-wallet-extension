import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import routes from './routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './components/theme'
import { SnackbarProvider } from './providers/Snackbar'
import { StatusBarProvider } from './providers/StatusBar'
import { AddressProvider } from './providers/AddressProvider'
import ProviderWrapper from './provider'
import store from './createStore'
import { BitcoinJSWallet } from 'dlc-lib'
import { ElectrsBlockchain } from 'dlc-lib'
import Config from './config'
import { LocalRepository } from './persistence/localRepository'

const storage = new LocalRepository()
const blockchain = new ElectrsBlockchain(Config.blockchainExplorerBaseUrl)
const wallet = new BitcoinJSWallet(storage, Config.network, blockchain)

ReactDOM.render(
  <ProviderWrapper store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AddressProvider addressFn={() => wallet.getNewAddress()}>
          <StatusBarProvider balanceFn={() => wallet.getBalance()}>
            {routes}
          </StatusBarProvider>
        </AddressProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </ProviderWrapper>,
  document.getElementById('root')
)
