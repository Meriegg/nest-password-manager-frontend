import React, { useEffect } from 'react'
import { getRefreshToken } from '../api/auth'
import { useRouter } from 'next/router'

// Types
import { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const getToken = async () => {
      const data = await getRefreshToken()

      if (data.statusCode !== 200) {
        router.push('/auth/register')
      }

      console.log(data)
    }

    getToken()
  }, [])

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Home
