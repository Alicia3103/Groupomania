import axios from '../api/axios'
import useAuth from './useAuth'

//déconnexion
const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    //vide les valeurs du auth context
    setAuth({})
    //appel de la deconnexion (suppression du refreshToken dans la DB et du cookie refreshToken)
    try {
      await axios('/api/auth/logout', { withCredentials: true })
    } catch (err) {
      console.log(err)
    }
  }

  return logout
}

export default useLogout
