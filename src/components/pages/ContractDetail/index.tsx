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
  const params = useParams()
  const success = useSelector((state) => state.dlc.actionSuccess)
  const [processRequested, setProcessRequested] = useState(false)
  const snackbar = useSnackbar()
  const dlcError = useSelector((state) => state.dlc.error)
  const [displayError, setDisplayError] = useState(true)
  const contractId = params.contractId
  const contracts = useSelector((state) => state.dlc.contracts)
  const contract = contracts.find((c) => getId(c) === contractId)
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
    async function getBalance() {
      const balance = await statusBarCtx.getBalance()
      setAvailableAmount(balance)
    }
    getBalance()
  }, [statusBarCtx])

  useEffect(() => {
    async function writeAcceptMessage() {
      if (contract.state === ContractState.Accepted) {
        const acceptMessage = toAcceptMessage(contract);
        console.log('acceptMessage: ', acceptMessage)
        const formattedMessage = { "accept_message": acceptMessage.toString() };
        console.log('formattedMessage: ', formattedMessage)
        // FIXME: hardcoded wallet BE endpoint
        try {
          await fetch(
            "http://oracle.dlc.link:8085/acceptoffer",
            {
              headers: { accept: "Accept: application/json" },
              method: 'POST',
              mode: 'no-cors',
              body: JSON.stringify(formattedMessage)
            }
          )
            .then((x) => x.json())
            .then((res) => {
              console.log(res);
              signAcceptMessage(res);
            })
        } catch (error) {
          console.error(`fetcherror: ${error}`);
        }
      }
    }
    // TODO: this fires if we just open an existing Accepted contract's page
    if (contract) writeAcceptMessage()
  }, [contract])

  useEffect(() => {
    if (processRequested && success) {
      navigate(`/`)
    }
  })

  const signAcceptMessage = (message: string): void => {
    setProcessRequested(true)
    dispatch(signRequest(message))
  }

  const handleAccept = (): void => {
    dispatch(acceptRequest(getId(contract)))
  }

  const handleReject = (): void => {
    dispatch(rejectRequest(getId(contract)))
    navigate('/')
  }

  const handleCancel = (): void => {
    navigate('/')
  }

  return (
    <div className="contractdetailsdiv">
      {contract !== undefined && (
        <ContractDetailTemplate
          data={contract}
          acceptContract={handleAccept}
          rejectContract={handleReject}
          cancel={handleCancel}
          availableAmount={availableAmount}
        />
      )}
    </div>
  )
}

export default ContractDetailPage
