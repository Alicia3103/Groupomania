import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import usePosts from '../../hooks/usePosts'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import colors from '../../utils/styles/colors'
import Post from '../Post/Post'

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
  const [errMsg, setErrMsg] = useState('')
  const [posts, setPosts] = usePosts()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/api/post', {
          signal: controller.signal,
        })
        if (!response.data.result.length) {
          setErrMsg('Pas de post à afficher')
        }
        isMounted && setPosts(response.data.result)
      } catch (err) {
        setErrMsg(err)
      }
    }

    getPosts()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  },[setPosts])
  return (
    <OldPostsContainers>
      {posts?.length ? (
        <div>
          {posts.map((post,index) => (
            <Post post={post} index ={index} key={index} />
          ))}
        </div>
      ) : (
        <p>{errMsg}</p>
      )}
    </OldPostsContainers>
  )
}

export default OldPostsContainer
