import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../../store/PostsReducer'
import useAuth from '../../hooks/useAuth'

function DeleteButton({ index }) {
  const {auth}=useAuth()
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const postId = posts[index].Id
  const handleDelete = () => {
    
      dispatch(deletePost(postId,auth.accessToken))
    
  }

  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  )
}

export default DeleteButton
