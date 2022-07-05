import React, { useEffect, useState } from 'react';

import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';

import styled from 'styled-components'
import backgroundImage from './groupomaniafond.jpg'
import PostForm from '../components/PostForm/PostForm';
import colors from '../utils/styles/colors';

import Post from '../components/Post';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';


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
    const [posts, setPosts] = useState();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPosts = async () => {

            try {
                const response = await axiosPrivate.get('/api/post', {
                    signal: controller.signal
                });
                console.log(response.data.result);
                isMounted && setPosts(response.data.result);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                
            }
        }

        getPosts();

        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, [])


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
                    {posts?.length
                ? (
                    <div>
                        {posts.map((post,index)=> <Post post={post} key={index}id={post.Id}/>)}
                    </div>
                ) : <p>No posts to display</p>
            }
                    </OldPostsContainer>
                </PostsContainer>
            </HomePageContainer>
        </HomePage>
    );
};

export default Home;