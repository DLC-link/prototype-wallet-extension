import React, { FC, useEffect, useState } from 'react'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import { ApplicationState } from '../../../store'

import ContractDetailTemplate from '../../templates/ContractDetailTemplate'
import { acceptRequest, rejectRequest } from '../../../store/dlc/actions'
import { useNavigate, useParams } from 'react-router-dom'
import { getId } from 'dlc-lib'
import { useStatusBarContext } from '../../../providers/StatusBar'

const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector

const ContractDetailPage: FC = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const contractId = params.contractId
  const contracts = useSelector((state) => state.dlc.contracts)
  const contract = contracts.find((c) => getId(c) === contractId)
  const navigate = useNavigate()

  const statusBarCtx = useStatusBarContext()

  const [availableAmount, setAvailableAmount] = useState(0)

  useEffect(() => {
    async function getBalance() {
      const balance = await statusBarCtx.getBalance()
      setAvailableAmount(balance)
    }
    getBalance()
  }, [statusBarCtx])

  const handleAccept = (): void => {
    dispatch(acceptRequest(getId(contract)))
    navigate('/signinput')
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
