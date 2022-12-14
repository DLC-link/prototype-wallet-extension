import React, { FC } from 'react'

interface AddressProviderType {
  getLastAddress: () => Promise<string[]>
}

const AddressContext = React.createContext({} as AddressProviderType)

type ProviderProps = {
  addressFn: () => Promise<string[]>
  children?: React.ReactNode
}

export const AddressProvider: FC<ProviderProps> = (props: ProviderProps) => {
  const getLastAddress = async (): Promise<string[]> => {
    try {
      let lastAddress = null
      await props.addressFn().then((addresses) => lastAddress = addresses[addresses.length]) 
      return lastAddress
    } catch {
      return [];
    }
  }

  return (
    <AddressContext.Provider value={{ getLastAddress: getLastAddress }}>
      {props.children}
    </AddressContext.Provider>
  )
}

export function useAddressContext(): AddressProviderType {
  return React.useContext(AddressContext)
}

export default AddressContext
