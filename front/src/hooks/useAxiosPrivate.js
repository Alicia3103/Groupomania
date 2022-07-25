import axios, { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const { auth } = useAuth()
  const refreshToken=auth.refreshToken
  console.log('refreshToken',refreshToken)

axiosPrivate.interceptors.response.use((response) => {  
    return response;
  }, async (error) => {
    console.log('error config',error.config)
    const originalRequest = error.config;
    if (error.config.url !=='/api/refreshToken' && error.response.status===401 && originalRequest._retry !== true){
      originalRequest._retry=true 
      if (refreshToken && refreshToken !== '') {
        axios.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
        console.log('refresh token');
        await axios.post('/api/refreshToken').then((response)=>{
          console.log('response',response)
          axiosPrivate.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
          originalRequest.headers['authorization'] = `Bearer ${response.data.token}`
        }).catch((error) => {
          console.log(error.response.status);
          
        });
        return axiosPrivate(originalRequest);
      }
    }
    console.log('refreshToken error')
    return 
  })
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if(!config.headers['authorization']){
        config.headers['authorization'] = `Bearer ${auth?.accessToken}`}
        return config
      },
      (error) => Promise.reject(error)
    )


    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [auth])
  return axiosPrivate
}
export default useAxiosPrivate
