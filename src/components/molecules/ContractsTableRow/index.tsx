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
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { FC, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import Config from '../../../config'
import { DateTime } from 'luxon'
import PageviewIcon from '@mui/icons-material/Pageview';

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
  const formattedContract = {
    ID:
      'id' in contract
        ? truncateContractID(contract.id)
        : truncateContractID(contract.temporaryContractId),
    collateral:
      'acceptParams' in contract ? contract.acceptParams.collateral : NaN,
    state: contract.state,
    fundingTX:
      contract.state == ContractState.Broadcast
        ? Config.blockChainExplorerBaseUrl +
          `tx/${Transaction.fromHex(contract.dlcTransactions.fund)}`
        : undefined,
    maturityDate: DateTime.fromSeconds(contractMaturityBound, zone).toFormat(
      dateTimeFormat
    ),
    feeRate: contract.feeRatePerVByte,
  }
  return formattedContract
}

type ContractsTableRowProps = {
  contract: AnyContract
  onExpanded: () => void
}

const ContractsTableRow: FC<ContractsTableRowProps> = (
  props: ContractsTableRowProps
) => {
  const [contract, setContract] = useState<AnyContract>(props.contract)
  const [formattedContract, setFormattedContract] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    setContract(props.contract)
    setFormattedContract(createFormattedContract(contract))
    setLoading(false)
  }, [props.contract])

  const handleClick = (): void => {
    setExpanded(!isExpanded)
    props.onExpanded()
  }

  return (
    !isLoading && (
      <>
        <Box sx={{ backgroundColor: '#4d4d4e' }}>
          <Fade in={isExpanded}>
            <Table sx={{ color: '#ffffff' }}>
              <TableRow sx={{ borderBottom: '0px', height: '8px' }}>
                <TableCell
                style={{ width: '30%' }}
                  sx={{
                    fontSize: '8px',
                    fontWeight: 'light',
                    textAlign: 'center',
                    padding: '2px',
                    border: '0px',
                  }}
                >
                  CONTRACT ID
                </TableCell>
                <TableCell
                style={{ width: '30%' }}
                  sx={{
                    fontSize: '8px',
                    fontWeight: 'light',
                    textAlign: 'center',
                    padding: '2px',
                    border: '0px',
                  }}
                >
                  COLLATERAL
                </TableCell>
                <TableCell
                style={{ width: '20%' }}
                  sx={{
                    fontSize: '8px',
                    fontWeight: 'light',
                    textAlign: 'center',
                    padding: '2px',
                    border: '0px',
                  }}
                >
                  FUNDING TX
                </TableCell>
                <TableCell
                style={{ width: '20%' }}
                  sx={{
                    fontSize: '8px',
                    fontWeight: 'light',
                    textAlign: 'center',
                    padding: '2px',
                    border: '0px',
                  }}
                >
                  OPEN DETAILS
                </TableCell>
              </TableRow>
            </Table>
          </Fade>
        </Box>
        <Table>
          <TableBody>
            <TableRow
              onMouseEnter={() => handleClick()}
              onMouseLeave={() => handleClick()}
              sx={{ width: '50px' }}
            >
              <TableCell
                style={{ width: '30%' }}
                sx={{
                  borderBottom: '5px',
                  paddingTop: '0px',
                  textAlign: 'center',
                }}
              >
                {formattedContract.ID}
              </TableCell>
              <TableCell
                style={{ width: '30%' }}
                sx={{
                  borderBottom: '5px',
                  paddingTop: '0px',
                  textAlign: 'center',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}
              >
                <BtcDisplay
                  satvalue={formattedContract.collateral}
                  currency="sats"
                ></BtcDisplay>
              </TableCell>
              <TableCell
                style={{ width: '20%' }}
                sx={{
                  borderBottom: '5px',
                  paddingTop: '0px',
                  textAlign: 'center',
                }}
              >
                {formattedContract.fundingTX !== undefined && (
                  <OpenInNewIcon
                    color="secondary"
                    onClick={() => openNewTab(formattedContract.fundingTX)}
                    sx={[
                      {
                        '&:hover': {
                          cursor: 'pointer'
                        },
                      },
                    ]}
                  ></OpenInNewIcon>
                )}
              </TableCell>
              <TableCell
                style={{ width: '20%' }}
                sx={{
                  borderBottom: '5px',
                  paddingTop: '0px',
                  textAlign: 'center',
                }}
              >
                  <PageviewIcon
                    color="secondary"
                    onClick={() => openNewTab(formattedContract.fundingTX)}
                    sx={[
                      {
                        '&:hover': {
                          cursor: 'pointer'
                        },
                      },
                    ]}
                  ></PageviewIcon>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    )
  )
}
export default ContractsTableRow
