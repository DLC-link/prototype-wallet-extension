import React, { FC, ReactElement, useState, useEffect } from 'react'
// @ts-ignore
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import { AnyContract } from 'dlc-lib'
import {
  getNumericOutcomeDescriptorRangePayouts,
  isEnumeratedContractDescriptor,
} from 'dlc-lib'
import { Box } from '@mui/system'

export type DataGridProps = Omit<
  MUIDataTableProps,
  'options' | 'columns' | 'data'
> & {
  data: AnyContract
}

interface DisplayOutcome {
  outcome: string
  offer: number
  accept: number
}

const parseOutcomes = (contract: AnyContract): DisplayOutcome[] => {
  const descriptor = contract.contractInfo.contractInfo.contractDescriptor
  const totalCollateral = contract.contractInfo.totalCollateral
  const displayOutcomes: DisplayOutcome[] = []
  if (isEnumeratedContractDescriptor(descriptor)) {
    for (const outcome of descriptor.payouts) {
      displayOutcomes.push({
        outcome: outcome.outcome,
        offer: outcome.offerPayout,
        accept: totalCollateral - outcome.offerPayout,
      })
    }
  } else {
    const rangeOutcomes = getNumericOutcomeDescriptorRangePayouts(
      descriptor,
      totalCollateral
    )
    for (const rangeOutcome of rangeOutcomes) {
      const outcome =
        rangeOutcome.count > 1
          ? `${rangeOutcome.start} - ${
              rangeOutcome.start + rangeOutcome.count - 1
            }`
          : `${rangeOutcome.start}`
      displayOutcomes.push({
        outcome,
        offer: rangeOutcome.payout.offer,
        accept: rangeOutcome.payout.accept,
      })
    }
  }

  return displayOutcomes
}

const OutcomesGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const [data, setData] = useState(parseOutcomes(props.data))

  useEffect(() => {
    const parsedData = parseOutcomes(props.data)
    setData(parsedData)
  }, [setData, props.data])

  const columns = [
    {
      name: 'outcome',
      label: 'Outcomes',
      options: {
        sort: true,
      },
    },
    {
      name: 'offer',
      label: 'Offer party receives',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => (
          <BtcDisplay
            satValue={data[dataIndex].offer}
            currency="BTC"
          />
        ),
      },
    },
    {
      name: 'accept',
      label: 'Accept party receives',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => (
          <BtcDisplay
            satValue={data[dataIndex].accept}
            currency="BTC"
          />
        ),
      },
    },
  ]

  return (
      <MUIDataTable title={props.title} data={[...data]} columns={columns} />
  )
}

export default OutcomesGrid
