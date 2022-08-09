import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()
  //récupération d'un nouvel accessToken valide
  const refresh = async () => {
    const response = await axios.get('/api/refreshToken', {
      withCredentials: true,
    })

    const accessToken = response.data.token

    //ajout des infos (userId, accessToken et is admin) dans le auth context
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
