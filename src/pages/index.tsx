import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../features/user/userSlice'
import { useAxios } from '../hooks/useAxios'

// Types
import { NextPage } from 'next'
import { RootState } from '../types/redux'

const Home: NextPage = () => {
  const axios = useAxios({ ignoreRefresh: false })
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    const getToken = async () => {
      if (authState.value.token) return

      const data: any = await axios.get('/user/getMyData')

      if (data?.statusCode !== 200) {
        router.push('/auth/register')
      }

      dispatch(setUserData(data?.data?.user))
    }

    getToken()
  }, [])

  const makeTestApiCall = async () => {
    const data = await axios.get('/user/getMyData')

    console.log(data)
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => makeTestApiCall()}>test api call</button>
    </>
  )
}

export default Home
