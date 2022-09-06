import { createHashHistory } from 'history'
import { applyMiddleware, Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'
import { ApplicationState, rootReducer, rootSaga } from './store'
import { DlcService } from './services/dlcService'
import {
  ElectrsBlockchain,
  BitcoinJSWallet,
  ContractUpdater,
  DlcManager,
} from 'dlc-lib'
import Config from './config'
import { ChromeRepository } from './persistence/chromeRepository'
import { LocalRepository } from './persistence/localRepository'

export const history = createHashHistory()

export type RootState = ReturnType<typeof rootReducer>

const storage = new LocalRepository()
const blockchain = new ElectrsBlockchain(Config.blockchainExplorerBaseUrl)
const wallet = new BitcoinJSWallet(storage, Config.network, blockchain)
const contractUpdater = new ContractUpdater(wallet, blockchain)
const dlcManager = new DlcManager(contractUpdater, storage)

const sagaMiddleware = createSagaMiddleware({
  context: {
    dlcAPI: new DlcService(dlcManager, storage),
  },
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export default store
