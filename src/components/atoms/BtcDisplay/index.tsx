import { Link, Typography, TypographyProps } from '@mui/material'
import numbro from 'numbro'
import React, { FC, useEffect, useState } from 'react'

export type BTCCurrency = 'SATS' | 'BTC'

export type BTCDisplayProps = TypographyProps & {
  satValue: number
  currency: BTCCurrency
}

function toBTCDisplay(satValue: number): string {
  return numbro(satValue)
    .divide(100000000)
    .format({ thousandSeparated: true, mantissa: 8, trimMantissa: true })
}

function toSATDisplay(satValue: number): string {
  return numbro(satValue).format({
    thousandSeparated: true,
    mantissa: 8,
    trimMantissa: true,
  })
}

export const BtcDisplay: FC<BTCDisplayProps> = (props: BTCDisplayProps) => {
  const [currencyState, setCurrencyState] = useState('SATS')

  useEffect(() => {
    setCurrencyState(props.currency)
  }, [props.currency, setCurrencyState])

  const handleCurrencyClick = (): void => {
    currencyState === 'SATS'
      ? setCurrencyState('BTC')
      : setCurrencyState('SATS')
  }

  return (
    <Link
      underline="none"
      onClick={handleCurrencyClick}
      style={{ cursor: 'pointer' }}
    >
      <Typography sx={{ padding: '5px', fontSize: '10px' }}>
        {Number.isNaN(props.satValue)
          ? 'N/A'
          : currencyState === 'SATS'
          ? toSATDisplay(props.satValue)
          : toBTCDisplay(props.satValue)}{' '}
        {currencyState}
      </Typography>
    </Link>
  )
}
