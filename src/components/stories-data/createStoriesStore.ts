import { createHashHistory } from 'history'
import { Store } from 'redux'
import { ApplicationState, rootReducer } from '../../store'
import { configureStore } from '@reduxjs/toolkit'

export const history = createHashHistory()

export default function configureAppStore(
  initialState?: ApplicationState
): Store<ApplicationState> {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  })

  return store
}
