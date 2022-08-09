import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

//utilisation du context donnée d'authentification
const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth
