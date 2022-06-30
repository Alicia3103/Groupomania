import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Post from '../components/Post';
import { isEmpty } from '../utils/Utils';
import styled from 'styled-components'
import backgroundImage from './groupomaniafond.jpg'
import PostForm from '../components/PostForm/PostForm';
import colors from '../utils/styles/colors';

const HomePage=styled.div`
display:flex;
flex-direction:column;
height:100vh;
background-image: url(${backgroundImage});
background-position: center; 
background-repeat: no-repeat; 
background-size: cover;
`

const HomePageContainer=styled.div`
display:flex;
align-items: center;
justify-content: flex-start;
width:100vw;


`
const PostsContainer= styled.div`
display:flex;
width: 50%;
flex-direction: column;
justify-content: space-around;
align-items: center;

`

const NewPostContainer=styled.div`

height:300px;
width:100%;
background-color:${colors.secondary};
border-radius:10px;

`
const OldPostsContainer=styled.div`
display:flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width:100%;
background-color:${colors.secondary};
border-radius:10px;
`

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