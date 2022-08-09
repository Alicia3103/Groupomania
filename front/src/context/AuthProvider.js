import { createContext, useState } from 'react'

const AuthContext = createContext({})

//context donnée d'authentification
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
