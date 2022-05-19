import React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import {
  Button,
  TextInput,
  InputWrapper,
  PasswordInput,
  Anchor,
} from '@mantine/core'
import { useAxios } from '../../hooks/useAxios'
import { useStyles } from './styles'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { refreshToken } from '../../features/auth/auth'
import { showNotification } from '@mantine/notifications'
import * as yup from 'yup'

// Types
import { NextPage } from 'next'

const Register: NextPage = () => {
  const axios = useAxios({ ignoreRefresh: true })
  const dispatch = useDispatch()
  const router = useRouter()
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
      const data: any = await axios.post('/auth/register', values)
      console.log(data)

      if (data?.statusCode !== 200) {
        showNotification({
          title: 'Error',
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
      <h1>Register!</h1>

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
            Register!
          </Button>
          <Anchor component={Link} href={'/auth/login'}>
            <a className={classes.bottomLink}>Already have an account?</a>
          </Anchor>
        </div>
      </form>
    </div>
  )
}

export default Register
