import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Post from '../components/Post';
import { isEmpty } from '../utils/Utils';

const Home = () => {
const posts= useSelector((state)=>state.postReducer)
console.log(posts)


    return (
        <div>
            <Header/>
            <Navigation/>
            Accueil
            <div className="post-container">
                {!isEmpty(posts)&& posts.map((post,index)=> <Post post={post} key={index}/>)}
            </div>
        </div>
    );
};

export default Home;