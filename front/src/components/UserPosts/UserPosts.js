import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import Post from '../Post/Post'
import useAuth from '../../hooks/useAuth'

const UserPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`

const UserPosts = () => {
  const { auth } = useAuth()
  const [userPosts, setUserPosts] = useState()
  const [likedPosts, setLikedPosts] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/api/post/byUser', {
          signal: controller.signal,
        })

        isMounted && setUserPosts(response.data.result)
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getPosts()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <UserPostsContainer>
      {userPosts?.length ? (
        <div>
          {userPosts.map((post) => (
            <Post post={post} likedPosts={likedPosts} key={post.Id} />
          ))}
        </div>
      ) : (
        <p>No posts to display</p>
      )}
    </UserPostsContainer>
  )
}

export default UserPosts
