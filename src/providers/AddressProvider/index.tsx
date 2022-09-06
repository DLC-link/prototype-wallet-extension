import React, { FC } from 'react'

interface AddressProviderType {
  getNewAddress: () => Promise<string>
}

const AddressContext = React.createContext({} as AddressProviderType)

type ProviderProps = {
  addressFn: () => Promise<string>
  children?: React.ReactNode
}

export const AddressProvider: FC<ProviderProps> = (props: ProviderProps) => {
  const getNewAddress = async (): Promise<string> => {
    try {
      return await props.addressFn()
    } catch {
      return 'N/A'
    }
  }

  return (
    <AddressContext.Provider value={{ getNewAddress: getNewAddress }}>
      {props.children}
    </AddressContext.Provider>
  )
}

export function useAddressContext(): AddressProviderType {
  return React.useContext(AddressContext)
}

export default AddressContext
