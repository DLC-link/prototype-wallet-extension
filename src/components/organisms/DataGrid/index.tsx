import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import { DateTime } from 'luxon'
import MUIDataTable, {
  MUIDataTableProps,
  Responsive,
  SelectableRows,
  // @ts-ignore
} from 'mui-datatables'
import numbro from 'numbro'
import { FC, ReactElement, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { AnyContract } from 'dlc-lib'

export type DataGridProps = Omit<
  MUIDataTableProps,
  'options' | 'columns' | 'data'
> & {
  data: AnyContract[]
  onRowClick?: (dataIndex: number) => void
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#E4E7EF',
      main: '#E4E7EF',
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
    MUIDataTable: {
      paper: {
        height: 'inherit',
        overflow: 'auto',
      },
    },
    MUIDataTableSelectCell: {
      root: {
        display: 'none',
      },
    },
    MUIDataTableToolbar: {
      actions: {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'flex-end',
      },
    },
    MuiChip: {
      styleOverrides: {
        deleteIcon: {
          color: '#3A4473',
          '&:hover': {
            color: '#4A5B83',
          },
        },
      },
    },
  },
})

function toCollateralString(collateral: number): string {
  if (isNaN(collateral)) return ''
  const collateralString = numbro(collateral).format({
    thousandSeparated: true,
  })

  return collateralString
}

const DataGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const [localData, setLocalData] = useState<AnyContract[]>(props.data)

  useEffect(() => {
    setLocalData(props.data)
  }, [props.data])

  const options = {
    selectableRows: 'none' as SelectableRows,
    responsive: 'vertical' as Responsive,
    denseTable: false,
    onRowClick: (
      _: any[],
      raw: { dataIndex: number; rowIndex: number }
    ): void => {
      if (props.onRowClick) {
        props.onRowClick(raw.dataIndex)
      }
    },
  }

  const columns = [
    {
      name: 'id',
      label: 'Contract ID',
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => {
          const contract = localData[dataIndex]
          if ('id' in contract) {
            return <Box> {contract.id}</Box>
          }
          return <Box>{contract.temporaryContractId}</Box>
        },
      },
    },
    {
      name: 'state',
      label: 'Status',
      options: {
        sort: true,
        customBodyRender: (value: ContractState): ReactElement => (
          <Box>{ContractState[value]}</Box>
        ),
      },
    },
    {
      name: 'offerCollateral',
      label: 'Offer Collateral',
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => {
          const contract = localData[dataIndex]
          return (
            <span>{toCollateralString(contract.offerParams.collateral)}</span>
          )
        },
      },
    },
    {
      name: 'acceptCollateral',
      label: 'Accept Collateral',
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => {
          const contract = localData[dataIndex]
          return (
            <span>
              {toCollateralString(
                'acceptParams' in contract
                  ? contract.acceptParams.collateral
                  : NaN
              )}
            </span>
          )
        },
      },
    },
    {
      name: 'contractMaturityBound',
      label: 'Maturity Time',
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => (
          <Box>
            {DateTime.fromMillis(
              localData[dataIndex].contractMaturityBound * 1000
            ).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
          </Box>
        ),
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={props.title}
        data={localData}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}

export default DataGrid
