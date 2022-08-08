import React from 'react'
import Header from '../components/Header/Header'

import styled from 'styled-components'
import colors from '../utils/styles/colors'
import backgroundImage from './groupomaniafond.jpg'

import { Link } from 'react-router-dom'

const LogOutPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
const LogOutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 3;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Connect = styled.div`
  font-size: 22px;
  display: flex;
  width: 400px;
  height: 400px;
  background-color: ${colors.secondary};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
const PVisite=styled.p`
font-size:28px;
font-weight: bold;

`
const ReConnect= styled.p`
color: ${colors.darkerSecondary};
`

const LogOut = () => {
  return (
    <LogOutPage>
      <Header />
      <LogOutContainer>
        <Connect>
          <PVisite>Merci de votre visite</PVisite>
          <Link to={'/connexion'}>
            <ReConnect>Vous voulez déjà revenir? Connectez-vous ici</ReConnect>
          </Link>
        </Connect>
      </LogOutContainer>
    </LogOutPage>
  )
}

export default LogOut
