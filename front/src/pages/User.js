import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Header from '../components/Header/Header';
import UserInfo from '../components/UserInfo/UserInfo'
import UserPosts from '../components/UserPosts/UserPosts'
import styled from 'styled-components';
import backgroundImage from './groupomaniafond.jpg'


const UserPage=styled.div`
`
const UserPageContainer= styled.section`
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
const UserContainer=styled.div``
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