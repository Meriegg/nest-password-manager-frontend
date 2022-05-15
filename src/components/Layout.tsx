import React from 'react'

// Types
interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
