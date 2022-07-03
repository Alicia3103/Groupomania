import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Header from '../components/Header/Header';
import UserInfo from '../components/UserInfo/UserInfo'
import UserPosts from '../components/UserPosts/UserPosts'
import styled from 'styled-components';
import backgroundImage from './groupomaniafond.jpg'
import colors from '../utils/styles/colors';


const UserPage=styled.div`
display:flex;
flex-direction:column;
height:100vh;
background-image: url(${backgroundImage});
background-position: center; 
background-repeat: no-repeat; 
background-size: cover;
`
const UserPageContainer= styled.section`
display:flex;
align-items: center;
justify-content: flex-start;
width:100vw;
`
const UserContainer=styled.div`
display:flex;
width: 50%;
flex-direction: column;
justify-content: space-around;
align-items: center;
`

const User = () => {
    return (
        <UserPage>
            <Header/>
            <UserPageContainer>
                <Navigation/>
                <UserContainer>
                        <UserInfo />          
                        <UserPosts/>
                </UserContainer>
            </UserPageContainer>
        </UserPage>
    );
};

export default User;