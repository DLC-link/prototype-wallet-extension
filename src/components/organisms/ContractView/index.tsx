import React from 'react'
import { Table, TableRow, TableCell, TableContainer } from '@mui/material'
import { DateTime } from 'luxon'
import { FC, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import Config from '../../../config'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { BtcDisplay } from '../../atoms/BtcDisplay'

export type ContractViewProps = {
  data: AnyContract
  acceptContract: () => void
  rejectContract: () => void
  cancel: () => void
  availableAmount: number
}

function truncateContractID(contractID: string) {
  return (
    contractID.substring(0, 4) +
    '...' +
    contractID.substring(contractID.length - 4, contractID.length)
  )
}

function openNewTab(blockChainLink: any) {
  window.open(blockChainLink, '_blank')
}

export const ContractView: FC<ContractViewProps> = (
  props: ContractViewProps
) => {
  const [isLoading, setLoading] = useState(true)
  const [contract, setContract] = useState(props.data)
  const [isProposal, setIsProposal] = useState(false)
  const [canAccept, setCanAccept] = useState(
    props.availableAmount >=
      contract.contractInfo.totalCollateral - contract.offerParams.collateral
  )
  const [formattedContract, setFormattedContract] = useState(null)
  const [blockChainLink, setBlockChainLink] = useState(null)

  const createAndSetFormattedContract = (contract: AnyContract) => {
    const contractMaturityBound = contract.contractMaturityBound
    const zone = { zone: 'utc' }
    const dateTimeFormat = 'yyyy-LL-dd HH:mm:ss'
    const contractID =
      'id' in contract ? contract.id : contract.temporaryContractId

    const formattedContract = {
      state: ContractState[contract.state],
      ID: truncateContractID(contractID),
      maturityDate: DateTime.fromSeconds(contractMaturityBound, zone).toFormat(
        dateTimeFormat
      ),
      feeRate: contract.feeRatePerVByte,
      collateral:
        contract.contractInfo.totalCollateral - contract.offerParams.collateral,
    }
    setFormattedContract(formattedContract)
  }

  const getAndSetBlockChainLink = () => {
    if (contract.state == ContractState.Broadcast) {
      const fundTxId = Transaction.fromHex(
        contract.dlcTransactions.fund
      ).getId()
      const blockChainLink = Config.blockChainExplorerBaseUrl + `tx/${fundTxId}`
      setBlockChainLink(blockChainLink)
    } else {
      setBlockChainLink(null)
    }
  }

  useEffect(() => {
    setContract(props.data)
    createAndSetFormattedContract(props.data)
    getAndSetBlockChainLink()
    setIsProposal(contract.state === ContractState.Offered)
    setLoading(false)
  }, [contract, setContract, props.data])

  useEffect(() => {
    setCanAccept(
      props.availableAmount >=
        contract.contractInfo.totalCollateral - contract.offerParams.collateral
    )
  }, [props.availableAmount, contract])

  const handleAccept = (): void => {
    props.acceptContract()
  }

  const handleReject = (): void => {
    props.rejectContract()
  }

  const handleCancel = (): void => {
    if (props.cancel) props.cancel()
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        top: '132.5px',
        left: '0px',
        position: 'fixed',
        zIndex: 1100,
        height: '467.5px',
        backgroundColor: '#4d4d4e',
      }}
    >
      {!isLoading && (
        <TableContainer sx={{ width: '429px' }}>
          <Table sx={{ color: '#ffffff' }}>
            <TableRow>
              <TableCell>CONTRACT ID:</TableCell>
              <TableCell>{formattedContract.ID}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>STATE:</TableCell>
              <TableCell>{formattedContract.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MATURITY DATE:</TableCell>
              <TableCell>{formattedContract.maturityDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FEE RATE:</TableCell>
              <TableCell>{formattedContract.feeRate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COLLATERAL:</TableCell>
              <TableCell>
                <BtcDisplay
                  satValue={formattedContract.collateral}
                  currency="SATS"
                ></BtcDisplay>
              </TableCell>
            </TableRow>
            {blockChainLink !== null && (
              <TableRow>
                <TableCell>FUNDING TX:</TableCell>
                <TableCell>
                  <OpenInNewIcon
                    color="secondary"
                    onClick={() => openNewTab(blockChainLink)}
                    sx={[
                      {
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      },
                    ]}
                  ></OpenInNewIcon>
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      )}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#4d4d4e',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
        }}
      >
        {isProposal && (
          <>
            <Button
              disabled={!canAccept}
              sx={{ color: '#ffffff', margin: '25px' }}
              variant="contained"
              color="secondary"
              
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              sx={{ color: '#ffffff', margin: '25px' }}
              variant="contained"
              color="primary"
              onClick={handleReject}
            >
              Reject
            </Button>
          </>
        )}
        <Button
          sx={{ color: '#ffffff', margin: '25px' }}
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}
