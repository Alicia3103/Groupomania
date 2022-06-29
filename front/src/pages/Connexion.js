import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import Header from '../components/Header/Header';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import styled from 'styled-components'
import colors from '../utils/styles/colors';

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
width:100%;
`
const Connect = styled.div `
font-size:22px;
display:flex;
max-width:400px;
flex-direction:column;
`
const HeaderButton = styled.div`
margin:0;
padding:0;
height:35px;

`
const Button= styled.button `
border: none ;
height:100%;
border-radius:10px 10px 0 0 ;

`

const Connexion = () => {
    const[signUp,setSignUp]=useState(true)
    return (
        <ConnexionPage>
        <Header/>
        <ConnectContainer>
           <Connect>
            <HeaderButton>
                <Button style={{background:signUp? colors.secondary:colors.primary}}
                onClick={()=>setSignUp(true)}>
                    S'inscrire
                </Button>
                <Button style={{background:signUp? colors.primary:colors.secondary}}
                onClick={()=>setSignUp(false)}>
                    Se connecter
                </Button>
            </HeaderButton>
            {signUp ? <SignUpForm/>:<LoginForm/>}
           </Connect>
           </ConnectContainer>
        </ConnexionPage>
    );
};

export default Connexion;