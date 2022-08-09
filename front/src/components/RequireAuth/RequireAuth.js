import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

//protection des routes avec authentification requise
const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  )
}
export default RequireAuth
