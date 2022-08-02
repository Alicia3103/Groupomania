import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import colors from '../../utils/styles/colors'

import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../store/PostsReducer'
import TestPost from '../Post/Post'
import useAuth from '../../hooks/useAuth'

const UserPostsContainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`

const AllUserPostsContainer = () => {
  const {auth}=useAuth()
  const [errMsg, setErrMsg] = useState('')

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
      dispatch(getUserPosts(auth.accessToken))
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <UserPostsContainers>
      {!isEmpty(userPosts[0]) ? (
        <div>
          {userPosts.map((post, index) => (
            <TestPost post={post} index={index} key={index} />
          ))}
        </div>
      ) : (
        <p>{errMsg}</p>
      )}
    </UserPostsContainers>
  )
}

export default AllUserPostsContainer
