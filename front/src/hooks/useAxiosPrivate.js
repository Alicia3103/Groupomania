import axios, { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const { auth } = useAuth()
  const { setAuth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log(config.url)
        console.log('A')
        if (!config.headers['authorization']) {
          console.log('B ' + JSON.stringify(auth))
          config.headers['authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config
        if (
          error.config.url !== '/api/refreshToken' &&
          error.response.status === 401 &&
          originalRequest._retry !== true
        ) {
          originalRequest._retry = true

          const response = await axios.get('/api/refreshToken', {
            withCredentials: true,
          })

          const accessToken = response.data.token

          setAuth({
            userId: response.data.userId,
            accessToken,
            isAdmin: response.data.isAdmin,
          })
          console.log('response', response)
          originalRequest.headers['authorization'] = `Bearer ${accessToken}`

          return axiosPrivate(originalRequest)
        }
        Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, setAuth])
  return axiosPrivate
}
export default useAxiosPrivate
