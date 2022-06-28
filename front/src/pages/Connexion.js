import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import Header from '../components/Header/Header';
import SignUpForm from '../components/SignUpForm/SignUpForm';


const Connexion = () => {
    const[signUp,setSignUp]=useState(true)
    return (
        <div>
            <Header/>
            Connexion
           <div className="connect-modal">
            <div className="header-btn">
                <button style={{background:signUp? "#FD2D01":"#FFD7D7"}}
                onClick={()=>setSignUp(true)}>
                    S'inscrire
                </button>
                <button style={{background:signUp? "#FFD7D7":"#FD2D01"}}
                onClick={()=>setSignUp(false)}>
                    Se connecter
                </button>
            </div>
            {signUp ? <SignUpForm/>:<LoginForm/>}
           </div>
        </div>
    );
};

export default Connexion;