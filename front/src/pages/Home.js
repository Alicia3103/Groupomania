import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Post from '../components/Post';
import { isEmpty } from '../utils/Utils';
import styled from 'styled-components'
import backgroundImage from './groupomaniafond.jpg'
import PostForm from '../components/PostForm/PostForm';

const HomePage=styled.div`
`

const HomePageContainer=styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-grow:3;
height:100vh;
width:100vw;
background-image: url(${backgroundImage});
background-position: center; 
background-repeat: no-repeat; 
background-size: cover;
`
const PostsContainer= styled.section``

const NewPostContainer=styled.div``
const OldPostsContainer=styled.div``

const Home = () => {
const posts= useSelector((state)=>state.postReducer)
console.log(posts)


    return (
        <HomePage>
            <Header/>
            <HomePageContainer>
                <Navigation/>
                <PostsContainer>
                    <NewPostContainer>
                        <PostForm/>
                    </NewPostContainer>
                    <OldPostsContainer>
                        {!isEmpty(posts)&& posts.map((post,index)=> <Post post={post} key={index}/>)}
                    </OldPostsContainer>
                </PostsContainer>
            </HomePageContainer>
        </HomePage>
    );
};

export default Home;