import { Link, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material'
import numbro from 'numbro'
import React, { FC, useEffect, useState } from 'react'
import theme from '../../theme'

export type BtcCurrency = 'sats' | 'BTC'

export type BtcDisplayProps = TypographyProps & {
  satvalue: number
  currency: BtcCurrency
  pnlcolors?: boolean
}

function toBtcDisplay(satValue: number): string {
  return numbro(satValue)
    .divide(100000000)
    .format({ thousandSeparated: true, mantissa: 8, trimMantissa: true })
}

function toSatDisplay(satValue: number): string {
  return numbro(satValue).format({
    thousandSeparated: true,
    mantissa: 8,
    trimMantissa: true,
  })
}

const BtcTypography = styled(Typography)<BtcDisplayProps>(
  (props) => `
    color: ${
      props.pnlcolors
        ? props.satvalue < 0
          ? 'red'
          : theme.palette.primary.main
        : theme.palette.text.primary
    }
  `
)

export const BtcDisplay: FC<BtcDisplayProps> = (props: BtcDisplayProps) => {
  const [currencyState, setCurrencyState] = useState('sats')
  const { pnlcolors, satvalue, currency, ...typoProps } = props
  useEffect(() => {
    setCurrencyState(props.currency)
  }, [props.currency, setCurrencyState])

  const handleCurrencyClick = (): void => {
    currencyState === 'sats'
      ? setCurrencyState('BTC')
      : setCurrencyState('sats')
  }

  return (
    <>
      <BtcTypography
        fontSize={currencyState === 'sats' ? '12px' : '14px' }
        pnlcolors={pnlcolors}
        satvalue={satvalue}
        currency={currency}
        {...typoProps}
      >
        <Link
          color="inherit"
          underline="none"
          onClick={handleCurrencyClick}
          style={{ cursor: 'pointer' }}
        >
          {Number.isNaN(props.satvalue)
            ? 'N/A'
            : currencyState === 'sats'
            ? toSatDisplay(props.satvalue)
            : toBtcDisplay(props.satvalue)}{' '}
          {currencyState}
        </Link>
      </BtcTypography>
    </>
  )
}
