import React from 'react'
import colors from '../../utils/styles/colors'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const ModifyButtonContainer = styled.button`
color:${colors.secondary};
margin-left:8px
box-shadow: 0px 10px 14px -7px #276873;
font-size:14px;
background-color:${colors.darkerSecondary};
border-radius:8px;
border:none;
width:22px;
height:22px;
`

function ModifyButton() {
  return (
    <ModifyButtonContainer>
      <FontAwesomeIcon icon={faPen} />
    </ModifyButtonContainer>
  )
}

export default ModifyButton
