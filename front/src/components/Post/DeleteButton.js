import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'
import usePosts from '../../hooks/usePosts'

function DeleteButton({index}) {
  const [posts]=usePosts()
 
  const postId = posts[index].Id
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
