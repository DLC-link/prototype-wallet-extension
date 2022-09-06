import React, { FC, useEffect, useState } from 'react'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../../../providers/Snackbar'
import { ApplicationState } from '../../../store'
import { dlcActionError, offerRequest } from '../../../store/dlc/actions'
import MessageInputTemplate from '../../templates/MessageInputTemplate'

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const AcceptOfferPage: FC = () => {
  const dispatch = useDispatch()
  const dlcError = useSelector((state) => state.dlc.error)
  const success = useSelector((state) => state.dlc.actionSuccess)
  const curContractId = useSelector((state) => state.dlc.currentId)
  const [displayError, setDisplayError] = useState(true)
  const [processRequested, setProcessRequested] = useState(false)
  const snackbar = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (displayError && dlcError) {
      snackbar.createSnack(dlcError, 'error')
      setDisplayError(false)
    }
    dispatch(dlcActionError({ error: '' }))
  }, [displayError, dlcError, snackbar, dispatch])

  useEffect(() => {
    if (processRequested && success) {
      navigate(`/contractdisplay/${curContractId}`)
    }
  })

  const handleProcessClicked = (message: string): void => {
    setProcessRequested(true)
    dispatch(offerRequest(message))
  }

  const handleCancelClicked = (): void => {
    navigate('/')
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {
        <MessageInputTemplate
          onProcess={handleProcessClicked}
          onCancel={handleCancelClicked}
        />
      }
    </div>
  )
}

export default AcceptOfferPage
