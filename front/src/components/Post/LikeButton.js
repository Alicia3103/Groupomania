import React, { useEffect, useState } from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosPrivate } from '../../api/axios'
import useAuth from '../../hooks/useAuth'

function LikeButton(post) {
  const { auth } = useAuth()
  const postId = post.post.Id
  const [likedPost, setLikedPost] = useState()


  useEffect(() => {
    const getLikedPosts = async () => {
      console.log('test getlike')
      try {
        const response = await axiosPrivate.get(`/api/post/${postId}/like`)
        setLikedPost(response.data.isLiked)
      } catch (err) {
        console.error(err)
      }
    }
    console.log('test like')
    getLikedPosts()
  }, [])

  const handleClick = () => {
    console.log('test handle')
    axiosPrivate.post(`api/post/${postId}/like`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    setLikedPost(!likedPost)
  }

  return (
    <div><FontAwesomeIcon
      onClick={handleClick}
      icon={faThumbsUp}
      style={{ color: likedPost ? 'green' : 'grey' }}
    />
    <div>{post.post.Likes}</div>
    </div>
  )
}

export default LikeButton
