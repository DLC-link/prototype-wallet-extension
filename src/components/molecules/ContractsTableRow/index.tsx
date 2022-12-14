import React from 'react'
import {
  TableRow,
  TableCell,
  TableHead,
  Collapse,
  Table,
  Box,
  TableBody,
  Tooltip,
  Fade,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { FC, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import Config from '../../../config'
import { DateTime } from 'luxon'
import PageviewIcon from '@mui/icons-material/Pageview'
import { Navigate, useNavigate } from 'react-router-dom'

const truncateContractID = (contractID: string) => {
  return (
    contractID.substring(0, 4) +
    '...' +
    contractID.substring(contractID.length - 4, contractID.length)
  )
}

const openNewTab = (blockChainLink: string) => {
  window.open(blockChainLink, '_blank')
}

const createFormattedContract = (contract: AnyContract) => {
  const contractMaturityBound = contract.contractMaturityBound
  const zone = { zone: 'utc' }
  const dateTimeFormat = 'yyyy-LL-dd HH:mm:ss'
  let blockChainLink;
  if (contract.state == ContractState.Broadcast) {
    const txID = Transaction.fromHex(contract.dlcTransactions.fund).getId()
    blockChainLink = Config.blockChainExplorerBaseUrl + `tx/${txID}`
  }
  const formattedContract = {
    ID:
      'id' in contract
        ? truncateContractID(contract.id)
        : truncateContractID(contract.temporaryContractId),
    collateral:
      'acceptParams' in contract ? contract.acceptParams.collateral : NaN,
    state: contract.state,
    fundingTX: blockChainLink,
    maturityDate: DateTime.fromSeconds(contractMaturityBound, zone).toFormat(
      dateTimeFormat
    ),
    feeRate: contract.feeRatePerVByte,
  }
  return formattedContract
}

type ContractsTableRowProps = {
  contract: AnyContract
}

const ContractsTableRow: FC<ContractsTableRowProps> = (
  props: ContractsTableRowProps
) => {
  const [contract, setContract] = useState<AnyContract>(props.contract)
  const [formattedContract, setFormattedContract] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setContract(props.contract)
    setFormattedContract(createFormattedContract(contract))
    setLoading(false)
  }, [props.contract])

  const handleOpenDialog = (): void => {
    const contractID = 'id' in contract
    ? contract.id
    : contract.temporaryContractId
    navigate(`/contractdisplay/${contractID}`);
  }

  return (
    !isLoading && (
      <>
        <TableRow>
          <TableCell>{formattedContract.ID}</TableCell>
          <TableCell>
            <BtcDisplay
              satValue={formattedContract.collateral}
              currency="SATS"
            ></BtcDisplay>
          </TableCell>
          <TableCell>
            {formattedContract.fundingTX !== undefined && (
              <IconButton>
              <OpenInNewIcon
                color="secondary"
                onClick={() => openNewTab(formattedContract.fundingTX)}
              ></OpenInNewIcon>
              </IconButton>
            )}
          </TableCell>
          <TableCell>
            <IconButton>
            <PageviewIcon
              color="secondary"
              onClick={() => handleOpenDialog()}
            ></PageviewIcon>
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    )
  )
}
export default ContractsTableRow
