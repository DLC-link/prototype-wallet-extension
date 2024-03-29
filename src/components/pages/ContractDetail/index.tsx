import React, { FC, useEffect, useState } from 'react'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import { ApplicationState } from '../../../store'

import ContractDetailTemplate from '../../templates/ContractDetailTemplate'
import {
  dlcActionError,
  acceptRequest,
  rejectRequest,
  signRequest,
} from '../../../store/dlc/actions'
import { useNavigate, useParams } from 'react-router-dom'
import { ContractState, getId, toAcceptMessage } from 'dlc-lib'
import { useStatusBarContext } from '../../../providers/StatusBar'
import { useSnackbar } from '../../../providers/Snackbar'

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const ContractDetailPage: FC = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.dlc.processing)
  const { contractId } = useParams()
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
  const defaultCounterpartyWalletURL = 'https://dev-oracle.dlc.link/wallet'

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
    console.log('Current Contract: ')
    console.log(contract)
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
    if (
      acceptMessageSubmitted &&
      success &&
      contract?.state === ContractState.Accepted
    ) {
      writeAcceptMessage()
    }
  })

  useEffect(() => {
    const logCounterPartyWalletURL = async () => {
      const counterpartyWalletURL = await getCounterpartyWalletURL()
      console.log(
        'Counterparty Wallet URL:',
        counterpartyWalletURL || defaultCounterpartyWalletURL
      )
    }
    logCounterPartyWalletURL()
  }, [])

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

  function getCounterpartyWalletURL() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('counterpartyWalletURL', function (data) {
        resolve(data.counterpartyWalletURL)
      })
    })
  }

  async function writeAcceptMessage() {
    const counterpartyWalletURL = await getCounterpartyWalletURL()
    console.log('writeAcceptMessage:')
    if (contract?.state === ContractState.Accepted) {
      const acceptMessage = toAcceptMessage(contract)
      const formattedMessage = {
        acceptMessage: JSON.stringify(acceptMessage).toString(),
      }
      try {
        await fetch(
          `${
            counterpartyWalletURL || defaultCounterpartyWalletURL
          }/offer/accept`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(formattedMessage),
          }
        )
          .then((x) => x.json())
          .then((res) => {
            console.log(res)
            signAcceptMessage(JSON.stringify(res))
            setAcceptMessageSubmitted(false)
          })
      } catch (error) {
        console.error(`Fetch Error: ${error}`)
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
