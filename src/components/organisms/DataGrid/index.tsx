import React from 'react'
import { Table, TableCell, TableHead, Collapse, Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import ContractsTableRow from '../../molecules/ContractsTableRow'

type DataGridProps = {
  data: AnyContract[]
}

const DataGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const [localData, setLocalData] = useState<AnyContract[]>(props.data)

  useEffect(() => {
    setLocalData(props.data)
  }, [props.data])

  return (
    <>
      
    </>
  )
}

export default DataGrid
