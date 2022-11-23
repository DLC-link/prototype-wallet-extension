import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, IconButton, Typography, Stack, Grid, Link } from '@mui/material'
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
import { useSnackbar } from '../../../providers/Snackbar'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import Config from '../../../config'

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
        overflow: 'none',
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

function getGridItem(
  title: string,
  content: ReactElement,
  dataTitle: string,
  key: number
): ReactElement {
  return (
    <Grid key={key} item xs={4}>
      <div>
        <Typography variant="body2" color="textPrimary">
          {title}
        </Typography>
        {content}
      </div>
    </Grid>
  )
}

function getLinkGridItem(
  title: string,
  link: string,
  dataTitle: string,
  key: number
): ReactElement {
  const reactElement = <Link href={link}>Fund transaction</Link>
  return getGridItem(title, reactElement, dataTitle, key)
}

function toCollateralString(collateral: number): string {
  if (isNaN(collateral)) return ''
  const collateralString = numbro(collateral).format({
    thousandSeparated: true,
  })

  return collateralString
}

export const truncateContractID = (contractID: string) => {
  return (
    contractID.substring(0, 4) +
    '...' +
    contractID.substring(contractID.length - 4, contractID.length)
  )
}

const DataGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const [localData, setLocalData] = useState<AnyContract[]>(props.data)
  const snackbar = useSnackbar()

  useEffect(() => {
    setLocalData(props.data)
  }, [props.data])

  // const copyToClickBoard = async (contractID: string) => {
  //   await navigator.clipboard.writeText(contractID)
  //   snackbar.createSnack('Contract ID copied to clipboard', 'success')
  // }

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
    // {
    //   name: 'id',
    //   label: 'Contract ID',
    //   options: {
    //     sort: true,
    //     customBodyRenderLite: (dataIndex: number): ReactElement => {
    //       const contract = localData[dataIndex]
    //       if ('id' in contract) {
    //         return (
    //           <Stack
    //             direction="row"
    //             spacing={2}
    //             alignItems="center"
    //             justifyContent="flex-start"
    //           >
    //             <Typography> {truncateContractID(contract.id)} </Typography>
    //             <IconButton
    //               size="small"
    //               onClick={(event) => (
    //                 event.stopPropagation(),
    //                 copyToClickBoard(contract.temporaryContractId)
    //               )}
    //             >
    //               <Typography fontSize={12}>Copy full address</Typography>
    //             </IconButton>
    //           </Stack>
    //         )
    //       }
    //       return (
    //         <Stack
    //           direction="row"
    //           spacing={2}
    //           alignItems="center"
    //           justifyContent="flex-start"
    //         >
    //           <Typography>
    //             {truncateContractID(contract.temporaryContractId)}
    //           </Typography>
    //           <IconButton
    //             size="small"
    //             onClick={(event) => (
    //               event.stopPropagation(),
    //               copyToClickBoard(contract.temporaryContractId)
    //             )}
    //           >
    //             <Typography fontSize={12}>Copy full address</Typography>
    //           </IconButton>
    //         </Stack>
    //       )
    //     },
    //   },
    // },
    // {
    //   name: 'state',
    //   label: 'Status',
    //   options: {
    //     sort: true,
    //     customBodyRender: (value: ContractState): ReactElement => (
    //       <Box>{ContractState[value]}</Box>
    //     ),
    //   },
    // },
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
      name: 'fundTransaction',
      label: 'Fund Transaction',
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex: number): ReactElement => {
          const contract = localData[dataIndex]
          console.log(contract.state)
          if (contract.state == ContractState.Broadcast) {
            const fundTxId = Transaction.fromHex(
              contract.dlcTransactions.fund
            ).getId()
            const blockchainLink =
              Config.blockchainExplorerBaseUrl + `tx/${fundTxId}`
            console.log('fundTxId: ' + fundTxId)
            console.log('blockchainLink: ' + blockchainLink)
            return <Link href={blockchainLink}>Fund Transaction</Link>
          }
        },
      },
    },

    // {
    //   name: 'contractMaturityBound',
    //   label: 'Maturity Time',
    //   options: {
    //     sort: true,
    //     customBodyRenderLite: (dataIndex: number): ReactElement => (
    //       <Box>
    //         {DateTime.fromMillis(
    //           localData[dataIndex].contractMaturityBound * 1000
    //         ).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
    //       </Box>
    //     ),
    //   },
    // },
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
