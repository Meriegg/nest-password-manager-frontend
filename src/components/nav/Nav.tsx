import React from 'react'
import Link from 'next/link'
import { Button } from '@mantine/core'
import { useStyles } from './styles'
import { PlusIcon, CogIcon } from '@heroicons/react/solid'
import { useModals } from '@mantine/modals'
import { CreateModalContent } from '../modalContent/createPassword'

// Types
interface Props {
  getPasswords: () => void
}

export const Nav: React.FC<Props> = ({ getPasswords }) => {
  const modals = useModals()
  const { classes } = useStyles()

  const openCreatePasswordModal = () => {
    modals.openModal({
      title: 'Create password!',
      children: <CreateModalContent getPasswords={getPasswords} />,
    })
  }

  return (
    <div className={classes.main}>
      <Button size={'lg'} radius={'lg'} onClick={() => openCreatePasswordModal()}>
        <PlusIcon fill={'#fff'} width={20} height={20} />
      </Button>
      <Link href={'/settings'}>
        <Button size={'lg'} radius={'lg'}>
          <CogIcon fill={'#fff'} width={20} height={20} />
        </Button>
      </Link>
    </div>
  )
}
