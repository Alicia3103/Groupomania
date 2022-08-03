import React, { useEffect, useState } from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useAuth from '../../hooks/useAuth'

import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../store/PostsReducer'

function LikeButton({ index }) {


  const { auth } = useAuth()
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const postId = posts[index].Id
  const [isLiked, setIsLiked] = useState(false)

  const nbLike = posts[index].Likes
  const likedPost=useSelector((state)=>state.likes)
  useEffect(()=>{
  if (likedPost.includes(posts[index].Id)){
    setIsLiked(true)
  }}
  ,[])
  console.log(likedPost)
  const handleClick = () => {
    dispatch(likePost(postId, auth.accessToken,auth.userId))

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
