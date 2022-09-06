/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { action } from 'typesafe-actions'
import { DlcActionTypes } from './types'
import { AnyContract } from 'dlc-lib'

export const contractRequest = () => action(DlcActionTypes.CONTRACT_REQUEST)
export const contractSuccess = (contracts: AnyContract[]) =>
  action(DlcActionTypes.CONTRACT_SUCCESS, contracts)
export const contractError = (error: string) =>
  action(DlcActionTypes.CONTRACT_ERROR, error)
export const offerRequest = (offerMessage: string) =>
  action(DlcActionTypes.OFFER_REQUEST, offerMessage)
export const acceptRequest = (contractId: string) =>
  action(DlcActionTypes.ACCEPT_REQUEST, contractId)
export const signRequest = (signMessage: string) =>
  action(DlcActionTypes.SIGN_REQUEST, signMessage)
export const rejectRequest = (contractId: string) =>
  action(DlcActionTypes.REJECT_REQUEST, contractId)
export const dlcActionSuccess = (contract: AnyContract) =>
  action(DlcActionTypes.DLC_ACTION_SUCCESS, contract)
export const dlcActionError = (error: {
  error: string
  contract?: AnyContract
}) => action(DlcActionTypes.DLC_ACTION_ERROR, error)
export const dlcSelectContract = (contract?: AnyContract) =>
  action(DlcActionTypes.DLC_SELECT, contract)
