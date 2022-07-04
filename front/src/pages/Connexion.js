import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import Header from '../components/Header/Header';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import styled from 'styled-components'
import colors from '../utils/styles/colors';
import backgroundImage from './groupomaniafond.jpg'
import { useSelector } from 'react-redux';

const ConnexionPage=styled.section `
display:flex;
flex-direction:column;
align-items:center;
height:100vh
`
const ConnectContainer = styled.div `
display:flex;
align-items: center;
justify-content: center;
flex-grow:3;
width:100vw;
background-image: url(${backgroundImage});
background-position: center; 
background-repeat: no-repeat; 
background-size: cover;
`
const Connect = styled.div `
font-size:22px;
display:flex;
width:400px;

flex-direction:column;
`
const HeaderButton = styled.div`
margin:0;
padding:0;
height:35px;

`
const Button= styled.button `
border: none ;
font-size:16px;
font-weight:bold;
height:100%;
border-radius:10px 10px 0 0 ;
`

const Connexion = () => {
    const[signUp,setSignUp]=useState(true)
    const user= useSelector((state)=>state.userReducer)
console.log(user)
    return (
        <ConnexionPage>
        <Header/>
        <ConnectContainer>
           <Connect>
            <HeaderButton>
               
                <Button style={{background:signUp?  colors.secondary:colors.darkerSecondary  , color: signUp? colors.primary:"black"}}
                onClick={()=>setSignUp(true)}>
                    Se connecter
                </Button>
                <Button style={{background:signUp?colors.darkerSecondary:colors.secondary, color: signUp? "black":colors.primary}}
                onClick={()=>setSignUp(false)}>
                    S'inscrire
                </Button>
            </HeaderButton>
            {signUp ? <LoginForm/>:<SignUpForm/>}
           </Connect>
           </ConnectContainer>
        </ConnexionPage>
    );
};

export default Connexion;