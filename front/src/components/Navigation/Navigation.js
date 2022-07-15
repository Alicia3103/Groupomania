import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  faUser,
  faRightFromBracket,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

const NavComponent = styled.div`
width:23%;
display:flex;
justify-content: flex-start;
align-self: start;
}

`
const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`
const NavIcon = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
  background-color: ${colors.secondary};
  color: ${colors.darkerSecondary};
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 40px;
`

const Navigation = () => {
  return (
    <NavComponent>
      <NavList>
        <NavLink to="/">
          <NavIcon>
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
          </NavIcon>
        </NavLink>
        <NavLink to="/user">
          <NavIcon>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </NavIcon>
        </NavLink>
        <NavLink to="/logout">
          <NavIcon>
            <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
          </NavIcon>
        </NavLink>
      </NavList>
    </NavComponent>
  )
}

export default Navigation
