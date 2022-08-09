import axios, { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'

//interceptor
const useInterceptorsAxiosPrivate = () => {
  const { auth } = useAuth()
  const { setAuth } = useAuth()
  //request interceptor, rajoute un header authorization s'il est absent
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    // response interceptor en cas de token invalide (absent cause de rechargement ou expiré)
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config
        //si la requete ne vient pas déjà du resfreshToken ou a déjà été interceptée une fois (évite les boucles d'interception)
        if (
          error.config.url !== '/api/refreshToken' &&
          error.response.status === 401 &&
          originalRequest._retry !== true
        ) {
          originalRequest._retry = true

          //appel à l'api pour récupérer un token valide
          const response = await axios.get('/api/refreshToken', {
            withCredentials: true,
          })

          const accessToken = response.data.token
          // mise à jour du context auth
          setAuth({
            userId: response.data.userId,
            accessToken,
            isAdmin: response.data.isAdmin,
          })
          //ajout du nouveau token valide dans la requete et renvois de celle ci
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
export default useInterceptorsAxiosPrivate
