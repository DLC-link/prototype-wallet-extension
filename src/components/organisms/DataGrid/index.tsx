import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, IconButton, Typography, Stack, Grid, Link, Button } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import { contractError } from '../../../store/dlc/actions';

export type DataGridProps = Omit<
  MUIDataTableProps,
  'options' | 'columns' | 'data'
> & {
  data: AnyContract[]
  onRowClick?: (dataIndex: number) => void
}

const colorPrimary = '#ffffff'
const colorSecondary = '#4d4d4e'
const colorBackgroundPrimary = '#f2a900'
const colorBackgroundSecondary = '#4d4d4e'
const iconColor = '#f2a900'

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif"
  },

  palette: {
    primary: {
      main: colorPrimary,
    },
    secondary: {
      main: colorSecondary,
    },
    background: {
      default: colorBackgroundPrimary,
      paper: colorBackgroundSecondary,
    },
    text: {
      primary: colorPrimary,
      secondary: colorSecondary,
    },
    action: {
      active: iconColor,
    },
  },

  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&$selected': {
            backgroundColor: "",
          },
          '&$hover:hover': {
            backgroundColor: "",
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

function openNewTab(blockChainLink: any) {
  window.open(blockChainLink, "_blank");
}

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
    // onRowClick: (
    //   _: any[],
    //   raw: { dataIndex: number; rowIndex: number }
    // ): void => {
    //   if (props.onRowClick) {
    //     props.onRowClick(raw.dataIndex)
    //   }
    // },
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
    // {
    //   name: 'offerCollateral',
    //   label: 'Offer Collateral',
    //   options: {
    //     sort: true,
    //     customBodyRenderLite: (dataIndex: number): ReactElement => {
    //       const contract = localData[dataIndex]
    //       return (
    //         <span>{toCollateralString(contract.offerParams.collateral)}</span>
    //       )
    //     },
    //   },
    // },
    {
      name: 'acceptCollateral',
      label: 'Collateral',
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
          const blockChaineExplorerBaseUrl = "http://stx-btc1.dlc.link:8001/";
          const contract = localData[dataIndex]
          if (contract.state == ContractState.Broadcast) {
            const fundTxId = Transaction.fromHex(
              contract.dlcTransactions.fund
            ).getId()
            const blockchainLink =
              blockChaineExplorerBaseUrl + `tx/${fundTxId}`
            console.log('fundTxId: ' + fundTxId)
            console.log('blockchainLink: ' + blockchainLink)
            return <Button size="small" onClick={() => openNewTab(blockchainLink)}><OpenInNewIcon color="action"></OpenInNewIcon></Button>
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
