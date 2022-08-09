import React from 'react'
import colors from '../../utils/styles/colors'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux'
import { DeletePost } from '../../store/PostsReducer'
import useAuth from '../../hooks/useAuth'
import styled from 'styled-components'

const DeleteButtonContainer=styled.button`
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

function DeleteButton({ index }) {
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const postId = posts[index].Id
  const handleDelete = () => {
    dispatch(DeletePost(postId, auth.accessToken))
  }

  return (
    <DeleteButtonContainer onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </DeleteButtonContainer>
  )
}

export default DeleteButton
