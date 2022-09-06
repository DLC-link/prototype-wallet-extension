import React, { FC, ReactElement, useState, useEffect } from 'react'
// @ts-ignore
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import { AnyContract } from 'dlc-lib'
import {
  getNumericOutcomeDescriptorRangePayouts,
  isEnumeratedContractDescriptor,
} from 'dlc-lib'

export type DataGridProps = Omit<
  MUIDataTableProps,
  'options' | 'columns' | 'data'
> & {
  data: AnyContract
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#E4E7EF',
      main: '#E4E7EF', // '#3AF3B1',
      dark: '#E4E7EF',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#E4E7EF',
      dark: '#B3B6C2',
    },
    background: {
      default: '#3A4473',
      paper: '#3A4473',
    },
    text: {
      primary: '#E4E7EF',
      secondary: '#A2A6B4',
    },
    action: {
      active: '#E4E7EF',
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: '#E4E7EF',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&$selected': {
            backgroundColor: 'rgb(255, 255, 255, 0.05)',
          },
          '&$hover:hover': {
            backgroundColor: 'rgb(255, 255, 255, 0.1)',
          },
        },
      },
    },
    //@ts-ignore
    MUIDataTableSelectCell: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
    MUIDataTableToolbar: {
      actions: {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'flex-end',
      },
    },
  },
})

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
            variant="inherit"
            satvalue={data[dataIndex].offer}
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
            variant="inherit"
            satvalue={data[dataIndex].accept}
            currency="BTC"
          />
        ),
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable title={props.title} data={[...data]} columns={columns} />
    </ThemeProvider>
  )
}

export default OutcomesGrid
