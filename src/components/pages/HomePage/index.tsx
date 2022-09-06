import React, { FC, useEffect, useState } from 'react'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { getId } from 'dlc-lib'
import { useSnackbar } from '../../../providers/Snackbar'
import { ApplicationState } from '../../../store'
import {
  contractRequest,
  dlcActionError,
  dlcSelectContract,
} from '../../../store/dlc/actions'
import ContractListTemplate from '../../templates/ContractListTemplate'
import { randomBytes as rand } from 'crypto'
import { useNavigate } from 'react-router-dom'

export function randomBytes(byteCount: number) {
  return Uint8Array.from(rand(byteCount))
}

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const ContractOverviewPage: FC = () => {
  const dispatch = useDispatch()
  const contracts = useSelector((state) => state.dlc.contracts)
  const dlcError = useSelector((state) => state.dlc.error)
  const [displayError, setDisplayError] = useState(true)
  const snackbar = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(dlcSelectContract())
    dispatch(contractRequest())
    if (displayError && dlcError) {
      snackbar.createSnack(dlcError, 'error')
      setDisplayError(false)
    }
    dispatch(dlcActionError({ error: '' }))
  }, [displayError, dlcError, snackbar, dispatch])

  const handleContractClicked = (index: number): void => {
    const contract = contracts[index]

    navigate(`/contractdisplay/${getId(contract)}`)
  }

  const handleAcceptOfferClicked = () => {
    navigate('/acceptoffer')
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {
        <ContractListTemplate
          data={contracts}
          onContractClicked={handleContractClicked}
          onAcceptOfferClicked={handleAcceptOfferClicked}
        />
      }
    </div>
  )
}

export default ContractOverviewPage
