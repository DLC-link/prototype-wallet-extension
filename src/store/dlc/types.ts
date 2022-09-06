import { AnyContract } from 'dlc-lib'

export enum DlcActionTypes {
  CONTRACT_REQUEST = '@@dlc/CONTRACT_REQUEST',
  CONTRACT_SUCCESS = '@@dlc/CONTRACT_SUCCESS',
  CONTRACT_ERROR = '@@dlc/CONTRACT_ERROR',
  OFFER_REQUEST = '@@dlc/OFFER_REQUEST',
  ACCEPT_REQUEST = '@@dlc/ACCEPT_REQUEST',
  SIGN_REQUEST = '@@dlc/SIGN_REQUEST',
  REJECT_REQUEST = '@@dlc/REJECT_REQUEST',
  DLC_ACTION_SUCCESS = '@@dlc/ACTION_SUCCESS',
  DLC_ACTION_ERROR = '@@dlc/ACTION_ERROR',
  DLC_SELECT = '@@dlc/DLC_RETRY',
  DLC_UPDATE = '@@dlc/DLC_UPDATE',
}

export interface DlcState {
  readonly contracts: AnyContract[]
  readonly actionSuccess: boolean
  readonly processing: boolean
  readonly error?: string
  readonly currentId?: string
  readonly acceptMsg?: string
}
