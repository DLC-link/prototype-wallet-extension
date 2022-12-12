import React from 'react'
import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import MainLayout from '../../organisms/MainLayout'
import ContractsTableRow from '../../molecules/ContractsTableRow'
import ContractsTableHeader from '../../molecules/ContractsTableHeader'
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
    <Box sx={{ width: '389px' }}>
      <StatusBar></StatusBar>
      <ContractsTableHeader></ContractsTableHeader>
      <Box sx={{ margin: '146.5px 0px 0px' }}>
        {contractData?.map((contract: AnyContract) => (
          <ContractsTableRow contract={contract}></ContractsTableRow>
        ))}
      </Box>
    </Box>
  )
}

export default ContractListTemplate
