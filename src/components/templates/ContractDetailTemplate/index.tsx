import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import MainLayout from '../../organisms/MainLayout'
import { Tabs, TabItem } from '../../molecules/Tabs'
import OutcomesGrid from '../../organisms/OutcomesGrid'
import { ContractView } from '../../organisms/ContractView'
import { AnyContract } from 'dlc-lib'
import { Typography } from '@mui/material'

type ContractDetailTemplateProps = {
  data: AnyContract
  acceptContract: () => void
  rejectContract: () => void
  cancel: () => void
  availableAmount: number
}

const tabItems: TabItem[] = [{ label: 'General' }, { label: 'Outcomes' }]

const ContractDetailTemplate: FC<ContractDetailTemplateProps> = (
  props: ContractDetailTemplateProps
) => {
  const contract = props.data

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (index: number): void => {
    setTabIndex(index)
  }

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
      <MainLayout>
          <Box sx={{ backgroundColor: '#f7931a', height: "50px" }}>
            <Typography fontSize={24} fontWeight="extrabold" color="#ffffff" align='center' padding={1}>Contract Details</Typography>
          </Box>
          {/* <Tabs
            items={tabItems}
            value={tabIndex}
            onTabChange={(idx): void => handleTabChange(idx)}
          /> */}
          {/* {tabIndex === 0 && ( */}
          <ContractView
            data={contract}
            cancel={handleCancel}
            acceptContract={handleAccept}
            rejectContract={handleReject}
            availableAmount={props.availableAmount}
          />
          {/* )} */}
          {/* {tabIndex === 1 && (
            <Box display="inline">
              <OutcomesGrid title={'Contract Outcomes'} data={contract} />
            </Box>
          )} */}
      </MainLayout>
  )
}

export default ContractDetailTemplate
