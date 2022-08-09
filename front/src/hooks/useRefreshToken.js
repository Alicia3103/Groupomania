import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
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
    return response.data.token
  }
  return refresh
}
export default useRefreshToken
