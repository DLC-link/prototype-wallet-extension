import React from 'react'
import {
  TableRow,
  TableCell,
  TableHead,
  Collapse,
  Table,
  Box,
  TableBody,
  Tooltip,
  Fade,
  Dialog,
  DialogContent,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { FC, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import Config from '../../../config'
import { DateTime } from 'luxon'
import PageviewIcon from '@mui/icons-material/Pageview'

type ContractQuickViewProps = {
  formattedContract: any
  isDialogOpen: boolean
  onOpenDialog: () => void
}

const viewTableContentCellSX = {
  color: '#ffffff',
  borderBottom: '5px',
}

const iconSX = {
  '&:hover': {
    cursor: 'pointer',
  },
}

const openNewTab = (blockChainLink: string) => {
    window.open(blockChainLink, '_blank')
  }

const ContractQuickView: FC<ContractQuickViewProps> = (
  props: ContractQuickViewProps
) => {
  return (
    <Dialog open={props.isDialogOpen} onClose={props.onOpenDialog}>
      <DialogContent dividers>
        <Box sx={{ flex: 1, width: '100%' }}>
          <Table>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>CONTRACT ID</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                {props.formattedContract.ID}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>STATE</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                {ContractState[props.formattedContract.state]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>MATURITY DATE</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                {props.formattedContract.maturityDate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>FEE RATE</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                {props.formattedContract.feeRate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>COLLATERAL</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                <BtcDisplay
                  satvalue={props.formattedContract.collateral}
                  currency="sats"
                ></BtcDisplay>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={viewTableContentCellSX}>FUNDING TX</TableCell>
              <TableCell sx={viewTableContentCellSX}>
                {props.formattedContract.fundingTX !== undefined && (
                  <OpenInNewIcon
                    color="secondary"
                    onClick={() =>
                      openNewTab(props.formattedContract.fundingTX)
                    }
                    sx={[iconSX]}
                  ></OpenInNewIcon>
                )}
              </TableCell>
            </TableRow>
          </Table>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ContractQuickView
