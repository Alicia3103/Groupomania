import React from 'react'

import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'

import styled from 'styled-components'
import backgroundImage from './groupomaniafond.jpg'
import PostForm from '../components/PostForm/PostForm'
import colors from '../utils/styles/colors'

import OldPostsContainer from '../components/OldPostContainer/OldPostsContainer'

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
`
const PostsContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const NewPostContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 10px;
`

const Home = () => {
  return (
    <HomePage>
      <Header />
      <HomePageContainer>
        <Navigation />
        <PostsContainer>
          <NewPostContainer>
            <PostForm />
          </NewPostContainer>
          <OldPostsContainer />
        </PostsContainer>
      </HomePageContainer>
    </HomePage>
  )
}

export default Home
