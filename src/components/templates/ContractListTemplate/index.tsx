import React from 'react'
import { Box, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import DataGrid from '../../organisms/DataGrid'
import MainLayout from '../../organisms/MainLayout'
import ContractsTableRow from '../../molecules/ContractsTableRow'
import ContractsTableHeader from '../../molecules/ContractsTableHeader'

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
    <Box sx={{ width: '389px', length: '389px' }}>
      <MainLayout></MainLayout>
      <ContractsTableHeader></ContractsTableHeader>
      <Box sx={{ margin: '141.5px 0px 0px'}}>
      {contractData?.map((contract: AnyContract) => (
        <ContractsTableRow contract={contract}></ContractsTableRow>
      ))}
      </Box>
    </Box>
  )
}

export default ContractListTemplate
