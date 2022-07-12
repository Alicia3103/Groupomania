import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import colors from '../../utils/styles/colors';
import Post from '../Post/Post';

const OldPostsContainers=styled.div `
display:flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width:100%;
background-color:${colors.secondary};
border-radius:10px;
`

const OldPostsContainer = () => {
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
        <OldPostsContainers>
                    {posts?.length
                ? (
                    <div>
                        {posts.map((post)=> <Post post={post} key={post.Id}/>)}
                    </div>
                ) : <p>No posts to display</p>
            }
                    </OldPostsContainers>
    );
};

export default OldPostsContainer;