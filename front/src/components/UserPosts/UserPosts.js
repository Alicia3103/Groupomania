import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import colors from '../../utils/styles/colors'

import { useDispatch, useSelector } from 'react-redux'
import { GetUserPosts } from '../../store/PostsReducer'
import { GetLikes } from '../../store/LikesReducer'

import Post from '../Post/Post'
import useAuth from '../../hooks/useAuth'

const UserPostsContainers = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  background-color: ${colors.secondary};
`

const AllUserPostsContainer = () => {
  const { auth } = useAuth()

  const [loadPost, setLoadPost] = useState(true)
  const userPosts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(GetUserPosts(auth.accessToken))
      dispatch(GetLikes(auth.accessToken))
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <UserPostsContainers>
      {!isEmpty(userPosts[0]) ? (
        <Posts>
          {userPosts.map((post, index) => (
            <Post post={post} index={index} key={index} />
          ))}
        </Posts>
      ) : (
        <p>Pas de posts à afficher</p>
      )}
    </UserPostsContainers>
  )
}

export default AllUserPostsContainer
