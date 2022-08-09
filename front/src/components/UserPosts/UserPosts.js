import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import colors from '../../utils/styles/colors'

import { useDispatch, useSelector } from 'react-redux'
import { GetUserPosts } from '../../store/PostsReducer'
import { GetLikes } from '../../store/LikesReducer'
import { isEmpty } from '../../utils/Utils'

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

  //chargement des posts et des likes de l'utilisateur dans redux
  useEffect(() => {
    if (loadPost) {
      dispatch(GetUserPosts(auth.accessToken))
      dispatch(GetLikes(auth.accessToken))
      setLoadPost(false)
    }
  }, [dispatch, loadPost])

  return (
    <UserPostsContainers>
      {/* Si les posts sont chargé dans redux affichage de tous les post avec un map */}
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
