import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import DataGrid from '../../organisms/DataGrid'
import MainLayout from '../../organisms/MainLayout'
import { NewAddressDialog } from '../../organisms/NewAddressDialog'
import { fontStyle } from '@mui/system'

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
        width: '357px',
        height: '100%',
      }}
    >
      <MainLayout>
        <Box sx={{ backgroundColor: '#f7931a' }}>
          <Typography
          textAlign='center'
            sx={{
              fontSize: '24px',
              padding: '5px',
              color: '#ffffff',
              fontWeight: 'bold',
              fontStyle: 'normal'
            }}
          >
            MY LOANS
          </Typography>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <DataGrid data={contractData} />
        </Box>
      </MainLayout>
    </Box>
  )
}

export default ContractListTemplate
