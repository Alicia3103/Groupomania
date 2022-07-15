import React, { useState } from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'

function LikeButton(post) {
  const postId = post.post.Id
  const [isLiked, setIsLiked] = useState(post.post.IsLiked)

  const handleClick = () => {
    if (isLiked) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
    }
    axiosPrivate.post(
      `api/post/${postId}/like`,
      { postId },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
  }

  return (
    <div>
      <FontAwesomeIcon
        onClick={handleClick}
        icon={faThumbsUp}
        style={{ color: isLiked ? 'green' : 'grey' }}
      />
    </div>
  )
}

export default LikeButton
