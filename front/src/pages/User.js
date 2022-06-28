import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Header from '../components/Header/Header';
import UserInfo from '../components/UserInfo/UserInfo'
import UserPosts from '../components/UserPosts/UserPosts'

const User = () => {
    return (
        <div>
            <Header/>
            <Navigation/>
            <UserInfo />
            <UserPosts/>
        </div>
    );
};

export default User;