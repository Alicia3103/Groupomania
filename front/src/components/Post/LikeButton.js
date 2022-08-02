import React, { useEffect, useState } from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

import { useSelector } from 'react-redux'

function LikeButton({ index }) {
  const { auth } = useAuth()
  console.log('like accessToken', auth.accessToken)
  const posts = useSelector((state) => state.posts)

  const postId = posts[index].Id
  const [isLiked, setIsLiked] = useState()
  const [nbLike, setNbLike] = useState(0)

  useEffect(() => {
    const getLikedPosts = async () => {
      try {
        const response = await axios.get(`/api/post/${postId}/like`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        })
        setNbLike(response.data.result.length)
        setIsLiked(response.data.isLiked)
      } catch (err) {
        console.error(err.response.data.error)
      }
    }

    getLikedPosts()
  }, [])

  const handleClick = () => {
    axios.post(`api/post/${postId}/like`, {
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
