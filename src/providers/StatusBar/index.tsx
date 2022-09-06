import React, { FC } from 'react'

interface StatusBarProviderType {
  getBalance: () => Promise<number>
}

const StatusBarContext = React.createContext({} as StatusBarProviderType)

type ProviderProps = {
  balanceFn: () => Promise<number>
  children?: React.ReactNode
}

export const StatusBarProvider: FC<ProviderProps> = (props: ProviderProps) => {
  const getBalance = async (): Promise<number> => {
    try {
      return await props.balanceFn()
    } catch {
      return NaN
    }
  }

  return (
    <StatusBarContext.Provider value={{ getBalance: getBalance }}>
      {props.children}
    </StatusBarContext.Provider>
  )
}

export function useStatusBarContext(): StatusBarProviderType {
  return React.useContext(StatusBarContext)
}

export default StatusBarContext
