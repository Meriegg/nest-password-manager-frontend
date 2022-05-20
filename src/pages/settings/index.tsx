import React from 'react'
import Link from 'next/link'
import { Button, Breadcrumbs, Anchor } from '@mantine/core'
import { LogoutIcon } from '@heroicons/react/outline'
import { useMantineTheme } from '@mantine/core'
import { useAxios } from '../../hooks/useAxios'
import { useRouter } from 'next/router'

// Types
import { NextPage } from 'next'
import { showNotification } from '@mantine/notifications'

const Settings: NextPage = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  const axios = useAxios({ ignoreRefresh: false })

  const breadCrumbsItems = [
    { title: 'home', href: '/' },
    { title: 'settings', href: '/settings' },
  ].map((item, index) => {
    return (
      <Anchor key={index} component={Link} href={item.href}>
        <a style={{ color: theme.colors.gray[2], textDecoration: 'none' }}>
          {item.title}
        </a>
      </Anchor>
    )
  })

  const logout = async () => {
    await axios.post('/auth/logout')

    router.push('/auth/register')

    showNotification({
      title: 'Success',
      message: 'Logged out successfully!',
      color: 'green',
    })
  }

  return (
    <div style={{ width: 'min(550px, 100%)', marginTop: '30px' }}>
      <Breadcrumbs>{breadCrumbsItems}</Breadcrumbs>
      <h1>Settings</h1>

      <Button
        size={'xl'}
        style={{ width: '100%' }}
        variant={'filled'}
        color={'gray'}
        leftIcon={<LogoutIcon width={25} height={25} />}
        onClick={() => logout()}
      >
        Log out
      </Button>
    </div>
  )
}

export default Settings
