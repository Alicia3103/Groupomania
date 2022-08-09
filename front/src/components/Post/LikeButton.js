import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useAuth from '../../hooks/useAuth'

import { useDispatch, useSelector } from 'react-redux'
import { LikePost } from '../../store/PostsReducer'
import { AddLike } from '../../store/LikesReducer'

const LikeContainer = styled.p`
  font-size: 16px;
  padding:3px;
`
const NbLikesP=styled.span`
font-size: 14px;
margin-right:4px;

`

function LikeButton({ index }) {
  const { auth } = useAuth()
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const postId = posts[index].Id
  const [isLiked, setIsLiked] = useState(false)

  const nbLike = posts[index].Likes
  const likedPost = useSelector((state) => state.likes)
  useEffect(() => {
    if (likedPost.includes(postId)) {
      setIsLiked(true)
    }
  }, [likedPost])

  const handleClick = () => {
    dispatch(LikePost(postId, auth.accessToken, auth.userId))

    dispatch(AddLike(postId))

    setIsLiked(!isLiked)
  }

  return (
    <LikeContainer>
      <NbLikesP>{nbLike}</NbLikesP>
       
        <FontAwesomeIcon
          onClick={handleClick}
          icon={faThumbsUp}
          style={{ color: isLiked ? 'green' : 'grey' }}
        />
      
    </LikeContainer>
  )
}

export default LikeButton
