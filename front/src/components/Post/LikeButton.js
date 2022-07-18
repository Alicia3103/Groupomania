import React, { useEffect, useState } from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'

function LikeButton(post) {
  const postId = post.post.Id
  const [isLiked, setIsLiked] = useState()
  const [nbLike, setNbLike] = useState(0)

  useEffect(() => {
    const getLikedPosts = async () => {
      try {
        const response = await axiosPrivate.get(`/api/post/${postId}/like`)
        setNbLike(response.data.result.length)
        setIsLiked(response.data.isLiked)
      } catch (err) {
        console.error(err.response.data.error)
      }
    }

    getLikedPosts()
  }, [])

  const handleClick = () => {
    axiosPrivate.post(`api/post/${postId}/like`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })

    if (isLiked) setNbLike(nbLike - 1)
    if (!isLiked) setNbLike(nbLike + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div>
      <FontAwesomeIcon
        onClick={handleClick}
        icon={faThumbsUp}
        style={{ color: isLiked ? 'green' : 'grey' }}
      />
      <div>{nbLike}</div>
    </div>
  )
}

export default LikeButton
