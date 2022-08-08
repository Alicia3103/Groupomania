import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useAuth from '../../hooks/useAuth'

import { GetUserInfos, UnactiveUser } from '../../store/UserReducer'
import colors from '../../utils/styles/colors'

const UserInfoContainer = styled.div`
  min-height: 150px;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin: 10px;
`
const UserInfos = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border: 2px solid ${colors.darkerSecondary};
`
const PInfos = styled.p`
  font-weight: bold;
`
const PMail = styled.p`
  font-style: italic;
  margin: 10px;
`
const DeleteButton = styled.button`
color:${colors.secondary};
margin-left:8px
box-shadow: 0px 10px 14px -7px #276873;
font-size:14px;
background-color:${colors.primary};
border-radius:6px;
border:none;
padding:0 10px ;
height:22px;

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
      <UserInfos>
        <PInfos className="nomPrenom">
          {infoUser?.Nom} {infoUser?.Prenom}
        </PInfos>
        <PMail className="mail">{infoUser?.Email}</PMail>

        <DeleteButton onClick={handleClick} className="desactiverCompte">
          Désactiver le compte
        </DeleteButton>
      </UserInfos>
    </UserInfoContainer>
  )
}

export default UserInfo
