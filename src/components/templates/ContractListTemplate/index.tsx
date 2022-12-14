import React from 'react'
import {
  Box,
  Table,
  TableHead,
  TableCell,
  Stack,
  TableContainer,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import ContractsTableRow from '../../molecules/ContractsTableRow'
import Header from '../../molecules/Header'
import StatusBar from '../../molecules/StatusBar'

type ContractListTemplateProps = {
  data: AnyContract[]
  onContractClicked: (contractIndex: number) => void
  onAcceptOfferClicked: () => void
}

const ContractListTemplate: FC<ContractListTemplateProps> = (
  props: ContractListTemplateProps
) => {
  const [contractData, setContractData] = useState<AnyContract[]>(props.data)

  useEffect(() => {
    setContractData(props.data)
  }, [props.data, setContractData])

  return (
    <Box>
      <StatusBar></StatusBar>
      <Stack
        sx={{
          direction: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '405px',
        }}
      >
        <Header type="list"></Header>
          <TableContainer sx={{ width: '421px', marginTop: '120.5px'}}>
            <Table sx={{ position: 'fixed', zIndex: 1100 }}>
              <TableHead>
                <TableCell style={{ width: '30%' }}>CONTRACT ID</TableCell>
                <TableCell style={{ width: '30%' }}>COLLATERAL</TableCell>
                <TableCell style={{ width: '20%' }}>FUNDING TX</TableCell>
                <TableCell style={{ width: '20%' }}>DETAILS</TableCell>
              </TableHead>
              </Table>
              <Table sx={{ marginTop: '25px'}}>
              {contractData?.map((contract: AnyContract) => (
                <ContractsTableRow contract={contract}></ContractsTableRow>
              ))}
            </Table>
          </TableContainer>
      </Stack>
    </Box>
  )
}

export default ContractListTemplate
