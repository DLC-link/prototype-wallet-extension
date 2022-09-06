import React from 'react'
import { Box, Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import DataGrid from '../../organisms/DataGrid'
import MainLayout from '../../organisms/MainLayout'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'

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

  const handleRowClicked = (contractIndex: number): void => {
    props.onContractClicked(contractIndex)
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#303855',
      }}
    >
      <MainLayout>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <DataGrid
            title={'All'}
            data={contractData}
            onRowClick={handleRowClicked}
          />
        </Box>
      </MainLayout>
      <NewAddressDialog />
      <Button onClick={props.onAcceptOfferClicked}>Accept Offer</Button>
    </Box>
  )
}

export default ContractListTemplate
