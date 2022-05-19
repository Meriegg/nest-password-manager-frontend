import React from 'react'
import Link from 'next/link'
import { useStyles } from './styles'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { refreshToken } from '../../features/auth/auth'
import { showNotification } from '@mantine/notifications'
import { useAxios } from '../../hooks/useAxios'
import * as yup from 'yup'

// Types
import type { NextPage } from 'next'
import {
  Anchor,
  Button,
  InputWrapper,
  PasswordInput,
  TextInput,
} from '@mantine/core'

const Login: NextPage = () => {
  const axios = useAxios({ ignoreRefresh: true })
  const router = useRouter()
  const dispatch = useDispatch()
  const { classes } = useStyles()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required('This is required!'),
    password: yup
      .string()
      .required('This is required!')
      .min(8, 'Password must be at least 8 characters!'),
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const data: any = await axios.post('/auth/login', values, {
        withCredentials: true,
      })

      if (data?.statusCode !== 200) {
        showNotification({
          title: 'Error!',
          message: data?.data?.message || 'An error happened!',
          color: 'red',
        })
        return
      }

      dispatch(refreshToken({ token: data?.data?.token }))
      showNotification({
        title: 'Success!',
        message: data?.data?.message || '',
        color: 'green',
      })
      router.push('/')
    },
    validationSchema,
  })

  return (
    <div className={classes.mainContainer}>
      <h1>Login!</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <InputWrapper required label={'Email'} error={!!errors.email}>
          <TextInput
            value={values.email}
            error={errors.email}
            placeholder={'example@something.com'}
            onChange={handleChange('email')}
          />
        </InputWrapper>

        <PasswordInput
          error={errors.password}
          value={values.password}
          onChange={handleChange('password')}
          label={'Password'}
          required
          placeholder={'ex: johnIsGay123'}
        />

        <div className={classes.formBottom}>
          <Button style={{ width: 'fit-content' }} type={'submit'}>
            Login!
          </Button>
          <Anchor component={Link} href={'/auth/register'}>
            <a className={classes.bottomLink}>Don't have an account?</a>
          </Anchor>
        </div>
      </form>
    </div>
  )
}

export default Login
