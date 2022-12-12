import React, { FC } from 'react'
import { Table, TableCell, TableHead, Typography, Stack } from '@mui/material'

type ContractsTableHeaderProps = {}

const tableHeadCellSX = {
  fontSize: '12px',
  fontWeight: 'light',
  color: '#ffffff',
  textAlign: 'center',
  padding: '2px'
}

const ContractsTableHeader: FC<ContractsTableHeaderProps> = (
  props: ContractsTableHeaderProps
) => {
  return (
    <Stack
      sx={{
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: '66.5px',
        left: '0px',
        position: 'fixed',
        height: '75px',
        width: '405px',
        backgroundColor: '#f7931a',
        zIndex: 1100
      }}
    >
      <Typography
        textAlign="center"
        sx={{
          padding: '5px',
          fontSize: '24px',
          color: '#ffffff',
          fontWeight: 'bold',
          fontStyle: 'normal',
        }}
      >
        MY DLC's
      </Typography>
      <Table sx={{ width: '389px' }}>
        <TableHead>
          <TableCell style={{ width: '30%' }} sx={tableHeadCellSX}>
            CONTRACT ID
          </TableCell>
          <TableCell style={{ width: '30%' }} sx={tableHeadCellSX}>
            COLLATERAL
          </TableCell>
          <TableCell style={{ width: '20%' }} sx={tableHeadCellSX}>
            FUNDING TX
          </TableCell>
          <TableCell style={{ width: '20%' }} sx={tableHeadCellSX}>
            DETAILS
          </TableCell>
        </TableHead>
      </Table>
    </Stack>
  )
}

export default ContractsTableHeader
