import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'

function DeleteButton(post) {
  const postId = post.post.Id

  const handleDelete = () => {
    try {
      axiosPrivate.delete(`api/post/${postId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
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
