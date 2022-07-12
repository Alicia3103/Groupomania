import React, { useEffect} from 'react';
import Header from '../components/Header/Header';

import styled from 'styled-components'
import colors from '../utils/styles/colors';
import backgroundImage from './groupomaniafond.jpg'
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';


const LogOutPage=styled.section `
display:flex;
flex-direction:column;
align-items:center;
height:100vh
`
const LogOutContainer = styled.div `
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
height:400px;
Background-color:${colors.secondary};
border-radius:10px;
flex-direction:column;
align-items: center;
justify-content: space-around;

`

const LogOut = () => {
    const{setAuth}= useAuth()
    useEffect(()=>{

        try{
         setAuth({userId:'',accessToken:'',isAdmin:''})   
        }catch(err){
            console.log(err)
        }
    // eslint-disable-next-line
    },[])
    
   

    return (
        <LogOutPage>
        <Header/>
        <LogOutContainer>
           <Connect>
            <p>Merci de votre visite</p>
            <Link to={"/connexion"}>Vous voulez déjà revenir? Connectez-vous ici</Link>
           </Connect>
           </LogOutContainer>
        </LogOutPage>
    );
};

export default LogOut;