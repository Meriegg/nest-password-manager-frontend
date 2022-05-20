import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../features/user/userSlice'
import { useAxios } from '../hooks/useAxios'
import { Password } from '../types'
import { Nav } from '../components/nav/Nav'
import { DisplayPasswords } from '../components/main/DisplayPasswords'

// Types
import { NextPage } from 'next'
import { RootState } from '../types/redux'

const Home: NextPage = () => {
  const [passwords, setPasswords] = useState<Array<Password>>([])
  const axios = useAxios({ ignoreRefresh: false })
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const getPasswords = async () => {
    const data = await axios.get('/password/getAllPasswords')

    setPasswords(data?.data?.passwords?.reverse())
  }

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
    getPasswords()
  }, [])

  return (
    <>
      <h1>My passwords</h1>

      <DisplayPasswords getPasswords={getPasswords} passwords={passwords} />

      <Nav getPasswords={getPasswords} />
    </>
  )
}

export default Home
