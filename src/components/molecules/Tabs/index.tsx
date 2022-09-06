import Badge from '@mui/material/Badge'
import Paper from '@mui/material/Paper'
import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import React, { FC } from 'react'

export type TabItem = {
  label: string
  new?: number
}

export type TabsProps = {
  items: TabItem[]
  value: number
  onTabChange: (tabIndex: number) => void
}

export const Tabs: FC<TabsProps> = (props: TabsProps) => {
  const handleTabChange = (
    event: React.ChangeEvent<any>,
    newValue: number
  ): void => {
    props.onTabChange(newValue)
  }

  return (
    <Paper elevation={0}>
      <MuiTabs value={props.value} onChange={handleTabChange}>
        {props.items.map((tab, i) => {
          return (
            <MuiTab
              key={tab.label}
              label={
                <Badge
                  badgeContent={tab.new}
                  color="primary"
                  invisible={!tab.new}
                >
                  {tab.label}
                </Badge>
              }
            ></MuiTab>
          )
        })}
      </MuiTabs>
    </Paper>
  )
}

Tabs.defaultProps = {
  items: [],
  value: 0,
}
