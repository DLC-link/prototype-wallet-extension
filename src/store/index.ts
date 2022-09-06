import { combineReducers } from '@reduxjs/toolkit'
import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects'

import { DlcState } from './dlc/types'
import { dlcReducer } from './dlc/reducer'
import dlcSaga from './dlc/sagas'

export interface ApplicationState {
  dlc: DlcState
}

export const rootReducer = combineReducers({
  dlc: dlcReducer,
})

export type RootState = ReturnType<typeof rootReducer>

type RootSaga = Generator<AllEffect<ForkEffect>, void, unknown>

export function* rootSaga(): RootSaga {
  yield all([fork(dlcSaga)])
}
