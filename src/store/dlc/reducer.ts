import { Reducer } from 'redux'
import { DlcState, DlcActionTypes } from './types'
import { AnyContract, getId } from 'dlc-lib'

export const initialState: DlcState = {
  contracts: [],
  processing: false,
  actionSuccess: false,
  error: undefined,
}

const reducer: Reducer<DlcState> = (state: DlcState = initialState, action) => {
  switch (action.type) {
    case DlcActionTypes.CONTRACT_REQUEST: {
      return { ...state, processing: true }
    }
    case DlcActionTypes.CONTRACT_SUCCESS: {
      return { ...state, processing: false, contracts: action.payload }
    }
    case DlcActionTypes.CONTRACT_ERROR: {
      return {
        ...state,
        processing: false,
        error: action.payload,
      }
    }
    case DlcActionTypes.OFFER_REQUEST:
    case DlcActionTypes.ACCEPT_REQUEST:
    case DlcActionTypes.REJECT_REQUEST:
    case DlcActionTypes.SIGN_REQUEST: {
      return { ...state, processing: true }
    }
    case DlcActionTypes.DLC_ACTION_SUCCESS: {
      const updatedContract = action.payload as AnyContract
      const newContracts = [...state.contracts]
      // NOTE: This is what fails. Contract ID is born in the dlcAPI.acceptContract call in the saga file. So our tempID is no longer found in the array so things break.
      const contractIndex = state.contracts.findIndex(
        (c) => getId(c) === getId(updatedContract) || c.temporaryContractId === updatedContract.temporaryContractId
      )
      if (contractIndex >= 0) newContracts[contractIndex] = updatedContract
      else newContracts.push(updatedContract)
      const newState = {
        ...state,
        contracts: newContracts,
        processing: false,
        actionSuccess: true,
        currentId: getId(updatedContract),
      }
      return newState
    }
    case DlcActionTypes.DLC_ACTION_ERROR: {
      const payload = action.payload as {
        error: string
        contract?: AnyContract
      }
      let newContracts = state.contracts
      const updatedContract = payload.contract
      if (updatedContract) {
        newContracts = [...state.contracts]
        const contractIndex = state.contracts.findIndex(
          (c) => getId(c) === getId(updatedContract)
        )
        if (contractIndex >= 0) newContracts[contractIndex] = updatedContract
        else newContracts.push(updatedContract)
      }
      const newState = {
        ...state,
        contracts: newContracts,
        processing: false,
        actionSuccess: false,
        error: payload.error,
      }
      return newState
    }
    case DlcActionTypes.DLC_UPDATE: {
      const updatedContract = action.payload as AnyContract
      const newContracts = [...state.contracts]
      const contractIndex = state.contracts.findIndex(
        (c) => getId(c) === getId(updatedContract)
      )
      if (contractIndex >= 0) newContracts[contractIndex] = updatedContract
      else newContracts.push(updatedContract)
      return { ...state, contracts: newContracts }
    }
    case DlcActionTypes.DLC_SELECT: {
      const contract = action.payload as AnyContract
      return {
        ...state,
        selectedContract: contract,
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as dlcReducer }
