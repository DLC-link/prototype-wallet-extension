import React, { FC, useEffect, useState } from 'react'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import { ApplicationState } from '../../../store'

import ContractDetailTemplate from '../../templates/ContractDetailTemplate'
import { dlcActionError, acceptRequest, rejectRequest, signRequest } from '../../../store/dlc/actions'
import { useNavigate, useParams } from 'react-router-dom'
import { ContractState, getId, toAcceptMessage } from 'dlc-lib'
import { useStatusBarContext } from '../../../providers/StatusBar'
import { useSnackbar } from '../../../providers/Snackbar'

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const ContractDetailPage: FC = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.dlc.processing)
  const { contractId, wallet } = useParams()
  const success = useSelector((state) => state.dlc.actionSuccess)
  const [signingRequested, setSigningRequested] = useState(false)
  const [acceptMessageSubmitted, setAcceptMessageSubmitted] = useState(false)
  const snackbar = useSnackbar()
  const dlcError = useSelector((state) => state.dlc.error)
  const [displayError, setDisplayError] = useState(true)
  const curContractId = useSelector((state) => state.dlc.currentId)
  const contracts = useSelector((state) => state.dlc.contracts)
  let contract = contracts.find((c) => getId(c) === contractId)
  const navigate = useNavigate()
  const statusBarCtx = useStatusBarContext()
  const [availableAmount, setAvailableAmount] = useState(0)

  useEffect(() => {
    if (displayError && dlcError) {
      snackbar.createSnack(dlcError, 'error')
      setDisplayError(false)
    }
    dispatch(dlcActionError({ error: '' }))
  }, [displayError, dlcError, snackbar, dispatch])

  useEffect(() => {
    if (loading) {
      snackbar.createSnack('Loading...', 'warning')
    }
  }, [loading])

  useEffect(() => {
    if (curContractId && contract?.state != ContractState.Accepted)
      contract = contracts.find((c) => getId(c) === curContractId)
    console.log(curContractId, contract)
  }, [curContractId])

  useEffect(() => {
    async function getBalance() {
      const balance = await statusBarCtx.getBalance()
      setAvailableAmount(balance)
    }
    getBalance()
  }, [statusBarCtx])

  useEffect(() => {
    if (signingRequested && success) {
      navigate(`/`)
    }
    if (acceptMessageSubmitted && success && contract?.state === ContractState.Accepted) {
      writeAcceptMessage();
    }
  })

  const handleAccept = (): void => {
    // This action will set the contract's status to Accepted
    // It will also update the contractID from temp to id.
    setAcceptMessageSubmitted(true)
    dispatch(acceptRequest(getId(contract)))
  }

  const handleReject = (): void => {
    dispatch(rejectRequest(getId(contract)))
    navigate('/')
  }

  const handleCancel = (): void => {
    navigate('/')
  }

  const signAcceptMessage = (message: string): void => {
    setSigningRequested(true)
    dispatch(signRequest(message))
  }

  async function writeAcceptMessage() {
    console.log('writeAcceptMessage:')
    if (contract?.state === ContractState.Accepted) {
      const acceptMessage = toAcceptMessage(contract);
      const formattedMessage = { "acceptMessage": JSON.stringify(acceptMessage).toString() };
      // NOTE: hardcoded wallet BE endpoint
      try {
        await fetch(
          `${decodeURIComponent(wallet)}/offer/accept`,
          {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(formattedMessage)
          }
        )
          .then((x) => x.json())
          .then((res) => {
            console.log(res);
            signAcceptMessage(JSON.stringify(res));
            setAcceptMessageSubmitted(false);
          })
      } catch (error) {
        console.error(`Fetch Error: ${error}`);
      }
    }
  }

  return (
    <>
      {contract !== undefined && (
        <ContractDetailTemplate
          data={contract}
          acceptContract={handleAccept}
          rejectContract={handleReject}
          cancel={handleCancel}
          availableAmount={availableAmount}
        />
      )}
    </>
  )
}

export default ContractDetailPage
