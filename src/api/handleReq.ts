import axios, { AxiosResponse } from 'axios'

export const handleReq = async (apiFunction: Function) => {
  try {
    const res: AxiosResponse = await apiFunction()

    return { statusCode: res.status, data: res.data }
  } catch (error: any) {
    console.error(error)

    if (!axios.isAxiosError(error)) {
      return {
        statusCode: 0,
        data: {
          message: 'Unkown Error!',
        },
      }
    }

    return {
      statusCode: error.response?.status,
      data: error.response?.data,
    }
  }
}
