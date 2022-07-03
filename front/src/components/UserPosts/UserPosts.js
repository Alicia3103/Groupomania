import React, { useEffect, useState } from 'react';
import axios from "axios"
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const UserPostsContainer=styled.div`
display:flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
height:200px;
width:100%;
background-color:${colors.secondary};
border-radius:10px;
`

const UserPosts=()=>{
    const [data,setData]= useState([]);
    useEffect(()=>{
        axios
        .get("http://localhost:3080/api/post/byUser")
        .then((res)=> setData(res.data))
    },[])

    return (
        <UserPostsContainer>
            <div className="userPosts">
        {       console.log(data.result)}
            </div>
        </UserPostsContainer>
    );
};

export default UserPosts;