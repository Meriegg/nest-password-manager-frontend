import jwtDecode from 'jwt-decode'
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from '../features/auth/auth'
import { handleError } from '../utils/handleApiError'
import { BASE_API_URL } from '../../prodConfig'

// Types
import { RootState } from '../types/redux'

const getNewAccessToken = async () => {
  try {
    const apiData: any = await axios.get(`${BASE_API_URL}/auth/refreshToken`, {
      withCredentials: true,
    })

    return apiData
  } catch (error) {
    return handleError(error)
  }
}

const dispatchNewAccessToken = (
  dispatch: Function,
  config: AxiosRequestConfig,
  token: string,
) => {
  if (!token) return

  // Dispatch the new token to memory
  dispatch(refreshToken({ token: token }))

  // Add the new token in the headers
  config.headers ? (config.headers['Authorization'] = `Bearer ${token}`) : null
}

export const useAxios = (options: { ignoreRefresh: boolean }) => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)

  // Create an axios instance
  const instance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
  })

  instance.interceptors.request.use(async (config) => {
    config.headers
      ? (config.headers['Authorization'] = `Bearer ${authState.value.token}`)
      : null

    if (options.ignoreRefresh) return config

    // Get new access token in case the old one expires
    const newAccessToken = await getNewAccessToken()

    // Check if the token exists
    if (!authState.value?.token) {
      dispatchNewAccessToken(dispatch, config, newAccessToken?.data?.token)
      return config
    }

    // Check if the token has expired
    // If the token has expired use the new refresh token
    const decodedToken: any = jwtDecode(authState.value?.token || '')
    if (Date.now() >= decodedToken?.exp * 1000) {
      dispatchNewAccessToken(dispatch, config, newAccessToken?.data?.token)
      return config
    }

    return config
  })

  // Response handling
  instance.interceptors.response.use(
    // handle response
    (response) => {
      return {
        statusCode: response.status,
        data: response?.data,
      }
    },

    // handle error
    (error) => {
      console.error(error)

      return handleError(error)
    },
  )

  return instance
}
