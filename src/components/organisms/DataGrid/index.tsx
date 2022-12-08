import React from 'react'
import {
  Table,
  TableCell,
  TableHead,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import ContractsTableRow from "../../molecules/ContractsTableRow"

type DataGridProps = {
  data: AnyContract[]
}

const DataGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const [localData, setLocalData] = useState<AnyContract[]>(props.data)

  useEffect(() => {
    setLocalData(props.data)
  }, [props.data])

  
  return (
    <Table sx={{ color: '#ffffff'}}>
      <TableHead sx={{ backgroundColor: '#f7931a'}}>
        <TableCell sx={{fontSize: '12px', fontWeight: 'light'}}>
          CONTRACT ID
        </TableCell>
        <TableCell sx={{fontSize: '12px', fontWeight: 'light'}}>
          COLLATERAL
        </TableCell>
        <TableCell sx={{fontSize: '12px', fontWeight: 'light'}}>
          FUNDING TX
        </TableCell>
      </TableHead>
      {localData?.map((contract) => (
        <ContractsTableRow contract={contract}></ContractsTableRow>
      ))}
    </Table>
  )
}

export default DataGrid
