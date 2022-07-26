import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const { setAuth } = useAuth()
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get('/api/refreshToken', {
          withCredentials: true,
        })
        console.log('rezponse', response)

        const accessToken = response.data.token

        setAuth({
          userId: response.data.userId,
          accessToken,
          isAdmin: response.data.isAdmin,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])
  useEffect(() => {
    console.log('isLoading', isLoading)
    console.log('aT', JSON.stringify(auth?.accessToken))
  }, [isLoading])

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>
}

export default PersistLogin
