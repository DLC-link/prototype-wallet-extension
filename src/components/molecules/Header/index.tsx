import React, { FC } from 'react'
import { Typography } from '@mui/material'

type HeaderProps = {
  type: string
}

const Header: FC<HeaderProps> = (
  props: HeaderProps
) => {
  let title = undefined

  switch (props.type) {
    case 'list':
      title = "MY DLC's"
      break
    case 'details':
      title = 'CONTRACT DETAILS'
      break
  }

  return (
    <>
      <Typography
        textAlign="center"
        sx={{
          position: 'fixed',
          top: '66.5px',
          height: '35px',
          width: '405px',
          padding: '15px',
          fontSize: '25px',
          fontWeight: 'bold',
          fontStyle: 'normal',
          color: '#ffffff',
          backgroundColor: '#f7931a',
        }}
      >
        {title}
      </Typography>
    </>
  )
}

export default Header
