import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'

import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../../store/PostsReducer'

function DeleteButton({ index }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const postId = posts[index].Id
  const handleDelete = () => {
    try {
      dispatch(deletePost(postId))
    } catch (err) {
      console.error(err.response.data.error)
    }
  }

  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  )
}

export default DeleteButton
