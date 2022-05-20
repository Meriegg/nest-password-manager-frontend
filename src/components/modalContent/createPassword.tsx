import React from 'react'
import { useFormik } from 'formik'
import {
  TextInput,
  PasswordInput,
  InputWrapper,
  Button,
  LoadingOverlay,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useAxios } from '../../hooks/useAxios'
import * as yup from 'yup'

// Types
interface Props {
  getPasswords: () => void
}

export const CreateModalContent: React.FC<Props> = ({ getPasswords }) => {
  const modals = useModals()
  const axios = useAxios({ ignoreRefresh: false })

  const initialValues = {
    content: '',
    platform: '',
    platformUser: '',
  }

  const validationSchema = yup.object().shape({
    content: yup.string().required('This is required!'),
  })

  const { handleChange, handleSubmit, errors, values, isSubmitting, setSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setSubmitting(true)

        const data = await axios.post('/password/createPassword', values)
        console.log(data)

        getPasswords()

        setSubmitting(false)
        modals.closeAll()
      },
    })

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <LoadingOverlay visible={isSubmitting} />

        <PasswordInput
          required
          label={'Password content'}
          error={errors?.content}
          placeholder={'some strong password'}
          onChange={handleChange('content')}
          value={values?.content}
        />

        <InputWrapper label={'Platform'}>
          <TextInput
            value={values?.platform}
            onChange={handleChange('platform')}
            placeholder={'ex: youtube.com (optional)'}
          />
        </InputWrapper>

        <InputWrapper label={'Platform Username'}>
          <TextInput
            value={values?.platformUser}
            onChange={handleChange('platformUser')}
            placeholder={'ex: ProGamerBoy69 (optional)'}
          />
        </InputWrapper>

        <Button type={'submit'} style={{ marginTop: '15px' }}>
          Create!
        </Button>
      </form>
    </div>
  )
}
