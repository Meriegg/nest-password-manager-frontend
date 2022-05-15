import React from 'react'
import { useFormik } from 'formik'
import { Button, TextInput, InputWrapper, PasswordInput } from '@mantine/core'
import { useStyles } from './styles'
import * as yup from 'yup'

// Types
import { NextPage } from 'next'

const Register: NextPage = () => {
  const { classes } = useStyles()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required('This is required!'),
    password: yup.string().required('This is required!'),
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values)
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
          error={errors.email}
          value={values.password}
          onChange={handleChange('password')}
          label={'Password'}
          required
          placeholder={'ex: johnIsGay123'}
        />

        <Button type={'submit'}>Register!</Button>
      </form>
    </div>
  )
}

export default Register
