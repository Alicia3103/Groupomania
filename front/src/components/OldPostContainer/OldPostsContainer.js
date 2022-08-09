import React, { useEffect, useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import colors from '../../utils/styles/colors'

import { GetPosts } from '../../store/PostsReducer'
import { GetLikes } from '../../store/LikesReducer'
import Post from '../Post/Post'
import useAuth from '../../hooks/useAuth'
import { isEmpty } from '../../utils/Utils'
const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
  margin-bottom: 10px;
`
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  background-color: ${colors.secondary};
`

const OldPostsContainer = () => {
  const [loadPost, setLoadPost] = useState(true)

  const { auth } = useAuth()

  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  //chargement des posts et des likes dans redux
  useEffect(() => {
    if (loadPost) {
      dispatch(GetPosts(auth.accessToken))
      dispatch(GetLikes(auth.accessToken))
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <ThreadContainer>
      {/* Si les posts sont chargé dans redux affichage de tous les post avec un map */}
      {!isEmpty(posts[0]) ? (
        <Posts>
          {posts.map((post, index) => (
            <Post index={index} key={index} />
          ))}
        </Posts>
      ) : (
        <p>Pas de posts à afficher</p>
      )}
    </ThreadContainer>
  )
}

export default OldPostsContainer
