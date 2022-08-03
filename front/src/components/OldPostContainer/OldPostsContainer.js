import React, { useEffect, useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import colors from '../../utils/styles/colors'

import { GetPosts } from '../../store/PostsReducer'
import { GetLikes } from '../../store/LikesReducer'
import Post from '../Post/Post'
import useAuth from '../../hooks/useAuth'

const OldPostsContainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`

const OldPostsContainer = () => {
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  const [loadPost, setLoadPost] = useState(true)

  const { auth } = useAuth()

  const reduxPosts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loadPost) {
      dispatch(GetPosts(auth.accessToken))
      dispatch(GetLikes(auth.accessToken))
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <OldPostsContainers>
      {!isEmpty(reduxPosts[0]) ? (
        <div>
          {reduxPosts.map((post, index) => (
            <Post post={post} index={index} key={index} />
          ))}
        </div>
      ) : (
        <p>Pas de posts à afficher</p>
      )}
    </OldPostsContainers>
  )
}

export default OldPostsContainer
