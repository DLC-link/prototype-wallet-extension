import React, { FC, useEffect, useState } from 'react'
import StatusBar from '../../molecules/StatusBar'

import { useStatusBarContext } from '../../../providers/StatusBar'
import { Box } from '@mui/material'

export type LayoutProps = {
  onBack?: () => void
  children?: React.ReactNode
}

const MainLayout: FC<LayoutProps> = (props: LayoutProps) => {
  const statusBarContext = useStatusBarContext()

  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getBalance = async (): Promise<void> => {
    const balance = await statusBarContext.getBalance()
    setBalance(balance)
  }

  const handleRefresh = (): void => {
    getBalance()
  }

  return (
    <Box>
      <StatusBar balance={balance} refresh={handleRefresh} />
      <Box>
        <Box sx={{ flexGrow: 2, display: 'flex', flexDirection: 'column' }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
