import React, { useEffect, useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import colors from '../../utils/styles/colors'

import { getReduxPosts } from '../../store/PostsReducer'
import TestPost from '../Post/Post'

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
  const [errMsg, setErrMsg] = useState('')

  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  const reduxPosts = useSelector((state) => state.posts)

  useEffect(() => {
    if (loadPost) {
      dispatch(getReduxPosts())
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <OldPostsContainers>
      {!isEmpty(reduxPosts[0]) ? (
        <div>
          {reduxPosts.map((post, index) => (
            <TestPost post={post} index={index} key={index} />
          ))}
        </div>
      ) : (
        <p>{errMsg}</p>
      )}
    </OldPostsContainers>
  )
}

export default OldPostsContainer
