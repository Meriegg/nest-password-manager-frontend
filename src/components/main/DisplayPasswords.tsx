import React from 'react'
import { Password } from '../../types/index'
import { useStyles } from './DisplayPasswordsStyles'
import { Text, Divider, Button } from '@mantine/core'
import { useAxios } from '../../hooks/useAxios'
import { showNotification } from '@mantine/notifications'
import { PasswordDisplay } from './Password'

// Types
interface Props {
  passwords: Array<Password>
  getPasswords: () => void
}

export const DisplayPasswords: React.FC<Props> = ({ passwords, getPasswords }) => {
  const axios = useAxios({ ignoreRefresh: false })
  const { classes } = useStyles()

  const deletePassword = async (passwordId: string) => {
    if (!confirm('Are you sure you want to delete this password?')) {
      return
    }

    const data: any = await axios.delete(`/password/${passwordId}`)

    if (data?.statusCode !== 200) {
      showNotification({
        title: 'Error',
        color: 'red',
        message: data?.data?.message || 'An error happened!',
      })
      return
    }

    showNotification({
      title: 'Success',
      color: 'green',
      message: data?.data?.message,
    })

    getPasswords()
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.password}>
        <Text>Platform</Text>
        <Text>Content</Text>
        <Text>Username</Text>
      </div>
      {passwords.map((password) => (
        <PasswordDisplay
          key={password.id}
          password={password}
          getPasswords={getPasswords}
        />
      ))}
    </div>
  )
}
