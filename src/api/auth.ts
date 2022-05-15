import { ApiInstance } from './index'
import { handleReq } from './handleReq'
import { AuthFormData } from '../types/index'

export const getRefreshToken = () =>
  handleReq(async () => {
    const data = await ApiInstance.get('/auth/refreshToken')

    return data
  })

export const login = (formData: AuthFormData) =>
  handleReq(async () => {
    const data = await ApiInstance.post('/auth/login', formData)

    return data
  })

export const register = (formData: AuthFormData) =>
  handleReq(async () => {
    const data = await ApiInstance.post('/auth/login', formData)

    return data
  })
