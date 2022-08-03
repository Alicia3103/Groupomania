import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useAuth from '../../hooks/useAuth'
import useInterceptorsAxiosPrivate from '../../hooks/useInterceptorsAxiosPrivate'
import { GetUserInfos, UnactiveUser } from '../../store/UserReducer'
import colors from '../../utils/styles/colors'

const UserInfoContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`
const UserInfo = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()
  const infoUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUserInfos(auth.accessToken))
    // eslint-disable-next-line
  }, [])
  const { setAuth } = useAuth()

  const handleClick = (e) => {
    e.preventDefault()

    dispatch(UnactiveUser(auth.accessToken))
    setAuth({ userId: '', accessToken: '' })

    navigate('/')
  }

  return (
    <UserInfoContainer>
      <div>
        <div className="userInfo">
          <p className="nomPrenom">
            {infoUser?.Nom} {infoUser?.Prenom}
          </p>
          <p className="mail">{infoUser?.Email}</p>
        </div>
      </div>

      <button onClick={handleClick} className="desactiverCompte">
        Désactiver le compte
      </button>
    </UserInfoContainer>
  )
}

export default UserInfo
