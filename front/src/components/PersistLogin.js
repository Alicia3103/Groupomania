import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const { setAuth } = useAuth()

  //vérification du refreshToken dans le cookiesecurisé et récupération d'un accessToken valide
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get('/api/refreshToken', {
          withCredentials: true,
        })

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

  return <>{isLoading ? <div>Loading ... </div> : <Outlet />}</>
}

export default PersistLogin
