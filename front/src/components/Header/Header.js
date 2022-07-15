import React from 'react'
import GroupomaniaLogo from '../images/icon-left-font-monochrome-white.png'
import styled from 'styled-components'
const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100vw;
  background: rgb(255, 145, 145);
  background: linear-gradient(
    0deg,
    rgba(255, 145, 145, 1) 0%,
    rgba(255, 215, 215, 1) 100%
  );
`
const HeaderImage = styled.img`
  height: 100%;
`

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderImage src={GroupomaniaLogo} alt="Logo groupomania" />
    </HeaderContainer>
  )
}

export default Header
