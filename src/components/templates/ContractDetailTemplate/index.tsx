import React, { FC } from 'react'
import { Box, Stack } from '@mui/material'
import { ContractView } from '../../organisms/ContractView'
import { AnyContract } from 'dlc-lib'
import StatusBar from '../../molecules/StatusBar'
import Header from '../../molecules/Header'

type ContractDetailTemplateProps = {
  data: AnyContract
  acceptContract: () => void
  rejectContract: () => void
  cancel: () => void
  availableAmount: number
}

const ContractDetailTemplate: FC<ContractDetailTemplateProps> = (
  props: ContractDetailTemplateProps
) => {
  const contract = props.data

  const handleAccept = (): void => {
    props.acceptContract()
  }

  const handleReject = (): void => {
    props.rejectContract()
  }

  const handleCancel = (): void => {
    props.cancel()
  }

  return (
    <Box sx={{ width: '405px', height: '600px'}}>
      <StatusBar></StatusBar>
      <Stack
        sx={{
          direction: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '405px',
        }}
      >
        <Header type='details'></Header>
        <ContractView
          data={contract}
          cancel={handleCancel}
          acceptContract={handleAccept}
          rejectContract={handleReject}
          availableAmount={props.availableAmount}
        />
      </Stack>
    </Box>
  )
}

export default ContractDetailTemplate
