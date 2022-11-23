import React from 'react'
import { Grid, Link, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { FC, ReactElement, useEffect, useState } from 'react'
import { ContractState } from 'dlc-lib'
import { BtcDisplay } from '../../atoms/BtcDisplay'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { AnyContract } from 'dlc-lib'
import { Transaction } from 'bitcoinjs-lib'
import Config from '../../../config'

export type ContractViewProps = {
  data: AnyContract
  acceptContract: () => void
  rejectContract: () => void
  cancel: () => void
  availableAmount: number
}

type ContentType = ContentTypeString | ContentTypeBtc | ContentTypeLink

type ContentTypeString = {
  title: string
  value: string
  btc?: boolean
}

type ContentTypeLink = {
  title: string
  value: string
  btc: undefined
  isLink: true
}

type ContentTypeBtc = {
  title: string
  value: number
  btc: boolean
  addOwn?: boolean
  pnlColors?: boolean
}

function truncateContractID(contractID: string) {
  return (
    contractID.substring(0, 4) +
    '...' +
    contractID.substring(contractID.length - 4, contractID.length)
  )
}

function isBtc(val: ContentType): val is ContentTypeBtc {
  return val.btc !== undefined && val.btc
}

function isLink(val: ContentType): val is ContentTypeLink {
  return 'isLink' in val
}

function getGridItem(
  title: string,
  content: ReactElement,
  dataTitle: string,
  key: number
): ReactElement {
  return (
    <Grid key={key} item xs={4}>
      <div>
        <Typography variant="body2" color="textPrimary">
          {title}
        </Typography>
        {content}
      </div>
    </Grid>
  )
}

function getLinkGridItem(
  title: string,
  link: string,
  dataTitle: string,
  key: number
): ReactElement {
  const reactElement = <Link href={link}>Fund transaction</Link>
  return getGridItem(title, reactElement, dataTitle, key)
}

function getTypographyGridItem(
  title: string,
  content: string,
  dataTitle: string,
  key: number
): ReactElement {
  const reactElement = (
    <Typography variant="body2" color="textPrimary">
      {content}
    </Typography>
  )

  return getGridItem(title, reactElement, dataTitle, key)
}

function getBtcDisplayGridItem(
  title: string,
  satValue: number,
  dataTitle: string,
  key: number,
  addOwn?: boolean,
  pnlColors?: boolean
): ReactElement {
  const reactElement = (
    <>
      <BtcDisplay
        pnlcolors={pnlColors}
        satvalue={satValue}
        currency="BTC"
        variant="body2"
      />
      {addOwn && (
        <Typography variant="body2" color="textPrimary">
          (own)
        </Typography>
      )}
    </>
  )

  return getGridItem(title, reactElement, dataTitle, key)
}

export const ContractView: FC<ContractViewProps> = (
  props: ContractViewProps
) => {
  const [contract, setContract] = useState(props.data)
  const [isProposal, setIsProposal] = useState(false)
  const [canAccept, setCanAccept] = useState(
    props.availableAmount >=
      contract.contractInfo.totalCollateral - contract.offerParams.collateral
  )

  useEffect(() => {
    setContract(props.data)
    setIsProposal(contract.state === ContractState.Offered)
  }, [contract, setContract, props.data])

  useEffect(() => {
    setCanAccept(
      props.availableAmount >=
        contract.contractInfo.totalCollateral - contract.offerParams.collateral
    )
  }, [props.availableAmount, contract])

  const handleAccept = (): void => {
    props.acceptContract()
  }

  const handleReject = (): void => {
    props.rejectContract()
  }

  const handleCancel = (): void => {
    if (props.cancel) props.cancel()
  }

  let content: ContentType[] = [
    { title: 'State', value: ContractState[contract.state] },
    {
      title: 'Maturity Date',
      value: DateTime.fromMillis(contract.contractMaturityBound * 1000, {
        zone: 'utc',
      }).toLocaleString(DateTime.DATETIME_FULL),
    },
    {
      title: 'Fee Rate (satoshi/vbytes)',
      value: contract.feeRatePerVByte.toString(),
    },
    {
      title: 'Offer Collateral',
      value: contract.offerParams.collateral,
      btc: true,
    },
    {
      title: 'Accept Collateral',
      value:
        contract.contractInfo.totalCollateral - contract.offerParams.collateral,
      btc: true,
    },
    {
      title: 'Available Amount',
      value: props.availableAmount,
      btc: true,
    },
  ]

  if (contract.state == ContractState.Broadcast) {
    const fundTxId = Transaction.fromHex(contract.dlcTransactions.fund).getId()
    const blockchainLink = Config.blockchainExplorerBaseUrl + `tx/${fundTxId}`
    content.push({
      title: 'Fund transaction',
      value: blockchainLink,
      isLink: true,
    })
  }

  const getDisplayContent = (): ReactElement[] => {
    const gridItems: ReactElement[] = []
    let key = 0
    for (const element of content) {
      if (isBtc(element)) {
        gridItems.push(
          getBtcDisplayGridItem(
            element.title,
            element.value,
            '',
            key,
            element.addOwn,
            element.pnlColors
          )
        )
      } else if (isLink(element)) {
        gridItems.push(getLinkGridItem(element.title, element.value, '', key))
      } else {
        gridItems.push(
          getTypographyGridItem(element.title, element.value, '', key)
        )
      }
      key++
    }
    return gridItems
  }

  const contractId =
    'id' in contract ? contract.id : contract.temporaryContractId

  return (
    <Box sx={{ width: '60%', marginTop: '1.5rem' }}>
      <Typography margin="2px 0px" variant="h4" color="textPrimary">
        {truncateContractID(contractId)}
      </Typography>
      <Box
        sx={{
          width: '48rem',
          borderBottom: '1px solid #B3B6C2',
          margin: '1rem 0rem',
        }}
      />
      <Grid margin="2px 0px" container spacing={3}>
        {getDisplayContent()}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '3rem',
        }}
      >
        {isProposal && (
          <>
            <Button
              disabled={!canAccept}
              variant="contained"
              color="primary"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReject}
            >
              Reject
            </Button>
          </>
        )}
        {!isProposal && (
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Back
          </Button>
        )}
      </Box>
    </Box>
  )
}
