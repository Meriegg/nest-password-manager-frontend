import axios from 'axios'

export const handleError = (error: any) => {
  if (!axios.isAxiosError(error)) {
    return {
      statusCode: 0,
      data: {
        message: error?.message || 'Could not identify the cause of this error'!,
      },
    }
  }

  return { statusCode: error?.response?.status, data: error?.response?.data }
}
