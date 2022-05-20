import React, { useState } from 'react'
import { Password } from '../../types/index'
import { Divider, Text, Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useStyles } from './DisplayPasswordsStyles'
import { useAxios } from '../../hooks/useAxios'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Types
interface Props {
  password: Password
  getPasswords: () => void
}

export const PasswordDisplay: React.FC<Props> = ({ password, getPasswords }) => {
  const [didCopy, setCopy] = useState<boolean>(false)
  const [isShown, setShown] = useState<boolean>(false)
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

  const handleCopiedState = () => {
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2500)
  }

  const hidePass = (pass: string) => {
    const DOT: string = '•'
    let newPass: string = ''

    pass.split('').forEach((letter) => {
      newPass += DOT
    })

    return newPass
  }

  return (
    <div>
      <Divider size={'sm'} />
      <div className={classes.password}>
        <Text>{password.platform || 'No platform'}</Text>
        <Text>{isShown ? password.content : hidePass(password.content)}</Text>
        <Text>{password.platformUsername || 'No username'}</Text>
      </div>
      <div style={{ width: 'fit-content', marginTop: '10px' }}>
        <Divider size={'sm'} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginTop: '5px',
          }}
        >
          <Button onClick={() => deletePassword(password.id)}>Delete</Button>
          <CopyToClipboard
            text={password.content}
            onCopy={() => handleCopiedState()}
          >
            <Button>{didCopy ? 'Copied!' : 'Copy'}</Button>
          </CopyToClipboard>
          <Button onClick={() => setShown(!isShown)}>Show</Button>
        </div>
      </div>
    </div>
  )
}
