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
import ContractQuickView from '../ContractQuickView/ContractQuickView'

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
  let blockChainLink = ''
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

const tableHeadCellSX = {
  fontSize: '8px',
  fontWeight: 'light',
  color: '#ffffff',
  textAlign: 'center',
  padding: '2px',
  border: '0px',
}

const tableContentCellSX = {
  color: '#ffffff',
  borderBottom: '5px',
  paddingTop: '0px',
  textAlign: 'center',
}

const iconSX = {
  '&:hover': {
    cursor: 'pointer',
  },
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
  const [isExpanded, setExpanded] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    setContract(props.contract)
    setFormattedContract(createFormattedContract(contract))
    setLoading(false)
  }, [props.contract])

  const handleMouseEvent = (enter: boolean): void => {
    switch (enter) {
      case true:
        setExpanded(true)
        break
      case false:
        setExpanded(false)
        break
    }
  }

  const handleOpenDialog = (): void => {
    setDialogOpen(!isDialogOpen)
    setExpanded(false)
  }

  return (
    !isLoading && (
      <>
        <Box sx={{ backgroundColor: '#4d4d4e' }}>
          <Fade in={isExpanded}>
            <Table>
              <TableRow>
                <TableCell style={{ width: '30%' }} sx={tableHeadCellSX}>
                  CONTRACT ID
                </TableCell>
                <TableCell style={{ width: '30%' }} sx={tableHeadCellSX}>
                  COLLATERAL
                </TableCell>
                <TableCell style={{ width: '20%' }} sx={tableHeadCellSX}>
                  FUNDING TX
                </TableCell>
                <TableCell style={{ width: '20%' }} sx={tableHeadCellSX}>
                  OPEN DETAILS
                </TableCell>
              </TableRow>
            </Table>
          </Fade>
        </Box>
        <Table>
          <TableRow
            onMouseEnter={() => handleMouseEvent(true)}
            onMouseLeave={() => handleMouseEvent(false)}
            sx={{ width: '50px' }}
          >
            <TableCell style={{ width: '30%' }} sx={tableContentCellSX}>
              {formattedContract.ID}
            </TableCell>
            <TableCell style={{ width: '30%' }} sx={tableContentCellSX}>
              <BtcDisplay
                satvalue={formattedContract.collateral}
                currency="sats"
              ></BtcDisplay>
            </TableCell>
            <TableCell style={{ width: '20%' }} sx={tableContentCellSX}>
              {formattedContract.fundingTX !== undefined && (
                <OpenInNewIcon
                  color="secondary"
                  onClick={() => openNewTab(formattedContract.fundingTX)}
                  sx={[iconSX]}
                ></OpenInNewIcon>
              )}
            </TableCell>
            <TableCell style={{ width: '20%' }} sx={tableContentCellSX}>
              <PageviewIcon
                color="secondary"
                onClick={() => handleOpenDialog()}
                sx={[iconSX]}
              ></PageviewIcon>
            </TableCell>
          </TableRow>
        </Table>
        <ContractQuickView
          formattedContract={formattedContract}
          isDialogOpen={isDialogOpen}
          onOpenDialog={handleOpenDialog}
        ></ContractQuickView>
      </>
    )
  )
}
export default ContractsTableRow
