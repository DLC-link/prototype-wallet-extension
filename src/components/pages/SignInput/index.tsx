import { ContractState, getId, toAcceptMessage } from 'dlc-lib'
import React, { FC, useEffect, useState } from 'react'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../../../providers/Snackbar'
import { ApplicationState } from '../../../store'
import { dlcActionError, signRequest } from '../../../store/dlc/actions'
import MessageInputTemplate from '../../templates/MessageInputTemplate'

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const AcceptOfferPage: FC = () => {
  const dispatch = useDispatch()
  const dlcError = useSelector((state) => state.dlc.error)
  const success = useSelector((state) => state.dlc.actionSuccess)
  const [displayError, setDisplayError] = useState(true)
  const [processRequested, setProcessRequested] = useState(false)
  const snackbar = useSnackbar()
  const navigate = useNavigate()
  const curContractId = useSelector((state) => state.dlc.currentId)
  const contracts = useSelector((state) => state.dlc.contracts)
  const contract = contracts.find((x) => getId(x) === curContractId)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    async function writeAcceptMessage() {
      if (contract.state === ContractState.Accepted && !copied) {
        const acceptMessage = toAcceptMessage(contract)
        await navigator.clipboard.writeText(JSON.stringify(acceptMessage))
        setCopied(true)
        snackbar.createSnack('Accept message copied to clipboard', 'success')
      }
    }
    writeAcceptMessage()
  }, [copied, contract, snackbar])

  useEffect(() => {
    if (displayError && dlcError) {
      snackbar.createSnack(dlcError, 'error')
      setDisplayError(false)
    }
    dispatch(dlcActionError({ error: '' }))
  }, [displayError, dlcError, snackbar, dispatch])

  useEffect(() => {
    if (processRequested && success) {
      navigate(`/`)
    }
  })

  const handleProcessClicked = (message: string): void => {
    setProcessRequested(true)
    dispatch(signRequest(message))
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {<MessageInputTemplate onProcess={handleProcessClicked} />}
    </div>
  )
}

export default AcceptOfferPage
