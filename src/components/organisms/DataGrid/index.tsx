import React from 'react'
import { Table, TableCell, TableHead, Collapse } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AnyContract } from 'dlc-lib'
import ContractsTableRow from '../../molecules/ContractsTableRow'
import { width } from '@mui/system'

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
      {localData?.map((contract) => (
        <ContractsTableRow
          contract={contract}
        ></ContractsTableRow>
      ))}
    </>
  )
}

export default DataGrid
