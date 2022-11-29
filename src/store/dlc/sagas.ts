import { all, call, fork, put, takeEvery, getContext } from 'redux-saga/effects'
import { DlcActionTypes } from './types'
import {
  contractError,
  contractSuccess,
  offerRequest,
  rejectRequest,
  dlcActionSuccess,
  dlcActionError,
  acceptRequest,
  signRequest,
} from './actions'
import { SagaIterator } from 'redux-saga'
import { AnyContract } from 'dlc-lib'
import { DlcAPI } from '../../api/dlcApi'

export function* handleContracts(): SagaIterator {
  try {
    const dlcAPI: DlcAPI = yield getContext('dlcAPI')
    const contracts = yield call([dlcAPI, dlcAPI.getAllContracts])
    yield put(contractSuccess(contracts))
  } catch (err) {
    yield put(contractError('HandleContracts Effect Failure.'))
  }
}

export function* handleOffer(
  action: ReturnType<typeof offerRequest>
): SagaIterator {
  try {
    const dlcAPI: DlcAPI = yield getContext('dlcAPI')
    const answer = (yield call(
      [dlcAPI, dlcAPI.processContractOffer],
      action.payload
    )) as AnyContract

    yield put(dlcActionSuccess(answer))
  } catch {
    yield put(dlcActionError({ error: 'HandleOffer Effect Failure.'}))
  }
}

export function* handleAccept(
  action: ReturnType<typeof acceptRequest>
): SagaIterator {
  try {
    const dlcAPI: DlcAPI = yield getContext('dlcAPI')
    const answer = (yield call(
      [dlcAPI, dlcAPI.acceptContract],
      action.payload
    )) as AnyContract
    yield put(dlcActionSuccess(answer))
  } catch (err) {
    yield put(dlcActionError({ error: 'HandleAccept Effect Failure.', contractID: action.payload }))
  }
}

export function* handleReject(
  action: ReturnType<typeof rejectRequest>
): SagaIterator {
  try {
    const dlcAPI: DlcAPI = yield getContext('dlcAPI')
    const answer = (yield call(
      [dlcAPI, dlcAPI.rejectContract],
      action.payload
    )) as AnyContract
    yield put(dlcActionSuccess(answer))
  } catch (err) {
    yield put(dlcActionError({ error: 'HandleReject Effect Failure.', contractID: action.payload }))
  }
}

export function* handleSign(
  action: ReturnType<typeof signRequest>
): SagaIterator {
  try {
    const dlcAPI: DlcAPI = yield getContext('dlcAPI')
    const answer = (yield call(
      [dlcAPI, dlcAPI.processContractSign],
      action.payload
    )) as AnyContract
    yield put(dlcActionSuccess(answer))
  } catch (err) {
    yield put(dlcActionError({ error: `HandleSign Effect Failure. Message was: ${action.payload}` }))
  }
}

function* watchRequests(): SagaIterator {
  yield takeEvery(DlcActionTypes.CONTRACT_REQUEST, handleContracts)
  yield takeEvery(DlcActionTypes.ACCEPT_REQUEST, handleAccept)
  yield takeEvery(DlcActionTypes.OFFER_REQUEST, handleOffer)
  yield takeEvery(DlcActionTypes.REJECT_REQUEST, handleReject)
  yield takeEvery(DlcActionTypes.SIGN_REQUEST, handleSign)
}

function* dlcSagas(): SagaIterator {
  yield all([fork(watchRequests)])
}

export default dlcSagas
