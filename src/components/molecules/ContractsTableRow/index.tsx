import React from 'react'
import { TableRow, TableCell } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { FC, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import Config from '../../../config'

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
  console.log('inside formatting')
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
        ? Config.blockchainExplorerBaseUrl +
          `tx/${Transaction.fromHex(contract.dlcTransactions.fund)}`
        : undefined,
  }
  console.log(formattedContract)
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

  useEffect(() => {
    setContract(props.contract)
    setFormattedContract(createFormattedContract(contract))
    setLoading(false)
  }, [props.contract])

  return (
    !isLoading && (
      <TableRow>
        <TableCell>{formattedContract.ID}</TableCell>
        <TableCell>
          <BtcDisplay
            satvalue={formattedContract.collateral}
            currency="sats"
          ></BtcDisplay>
        </TableCell>
        <TableCell>
          {formattedContract.fundingTX !== undefined && (
            <OpenInNewIcon
              color="secondary"
              onClick={() => openNewTab(formattedContract.fundingTX)}
              sx={[
                {
                  '&:hover': {
                    cursor: 'pointer',
                  },
                },
              ]}
            ></OpenInNewIcon>
          )}
        </TableCell>
      </TableRow>
    )
  )
}
export default ContractsTableRow
