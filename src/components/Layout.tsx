import React from 'react'
import { useStyles } from './layoutStyle'

// Types
interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.mainContainer}>
        <main>{children}</main>
      </div>
    </>
  )
}
