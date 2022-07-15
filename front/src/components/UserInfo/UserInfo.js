import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import colors from '../../utils/styles/colors'

const UserInfoContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`
const UserInfo = () => {
  const [user, setUser] = useState()
  const [errMsg, setErrMsg] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const USER_URL = '/api/auth/user'

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(USER_URL, {
          signal: controller.signal,
        })

        isMounted && setUser(response.data.result[0])
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUser()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  }, [])
  const { setAuth } = useAuth()

  const handleClick = (e) => {
    e.preventDefault()

    const DELETE_URL = '/api/auth/unactiveAccount'

    try {
      axiosPrivate.put(DELETE_URL)
      const accessToken = ''
      const userId = ''

      setAuth({ userId, accessToken })

      navigate('/')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Pas de réponse Serveur')
      } else if (err.response?.status === 401) {
        setErrMsg('Vous ne possédez pas ce compte')
      } else if (err.response?.status === 404) {
        setErrMsg('Utilisateur non trouvé')
      } else {
        setErrMsg('La désactivation a echouée')
      }
    }
  }

  return (
    <UserInfoContainer>
      <div className="userInfo">
        <p className="nomPrenom">
          {user?.Nom} {user?.Prenom}
        </p>
        <p className="mail">{user?.Email}</p>
      </div>
      <button onClick={handleClick} className="desactiverCompte">
        Désactiver le compte
      </button>
    </UserInfoContainer>
  )
}

export default UserInfo
