import axios from '../../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import { faCheck,faInfoCircle,faTimes  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import colors from '../../utils/styles/colors';

const SignUpContainer=styled.div`
Background-color:${colors.secondary};
border-radius: 0 10px 10px 10px ;
height:400px;
box-shadow: 10px 15px 16px 6px rgba(0,0,0,0.51);
padding:40px 25px 40px 25px;
`
const SignUpFormContainer=styled.form`
display:flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
height:100%;
`
const Input=styled.input`
margin:10px;
padding:5px;
border-radius:15px;
border-color:${colors.secondary};
`
const InputButton=styled.input`
margin:10px;
padding:5px;
background-color:${colors.darkerSecondary};
border-radius:15px;
border-color:${colors.darkerSecondary};
`
const NOM_REGEX = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/;
const EMAIL_REGEX = /^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const REGISTER_URL = '/api/auth/signup';



const SignUpForm = () => {
    const userRef=useRef()
    const errRef=useRef()


    const[nom,setNom]=useState('')
    const[validNom,setValidNom]=useState(false)
    const[nomFocus,setNomFocus]=useState(false)


    const[prenom,setPrenom]=useState('')
    const[validPrenom,setValidPrenom]=useState(false)
    const[prenomFocus,setPrenomFocus]=useState(false)

    const[email,setEmail]=useState('')
    const[validEmail,setValidEmail]=useState(false)
    const[emailFocus,setEmailFocus]=useState(false)

    const[password,setPassword]=useState('')
    const[validPassword,setValidPassword]=useState(false)
    const[passwordFocus,setPasswordFocus]=useState(false)

    const[errMsg,setErrMsg]=useState('')
    const[susccess,setSuccess]=useState(false)
    
    
    const{setAuth}= useAuth()

    const navigate=useNavigate()
    const location= useLocation()
    

    
    useEffect(()=>{
        userRef.current.focus();
    },[])
    useEffect(()=>{
        setValidNom(NOM_REGEX.test(nom));

    },[nom])
     useEffect(()=>{
        setValidPrenom(NOM_REGEX.test(prenom));
    },[prenom])
    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email));
    },[email])
    useEffect(()=>{
        setValidPassword(PASSWORD_REGEX.test(password));
    },[password])

    useEffect(()=>{
        setErrMsg('');
    },[nom,prenom,email,password])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        //vérification des regex avant l'envois au backend
        const vNom=NOM_REGEX.test(nom)
        const vPrenom =NOM_REGEX.test(prenom)
        const vEmail=EMAIL_REGEX.test(email)
        const vPassword=PASSWORD_REGEX.test(password)
        
        if (!vNom || !vPrenom || !vEmail || !vPassword){
            setErrMsg('Informations non valide')
            return
        }
        try{
            const response = await axios.post(REGISTER_URL,
               {nom,prenom,email,password},
                    {
                        headers:{'Content-Type':'application/json'},
                        withCredentials:true
                    })
        const accessToken = response?.data?.token
        const userId=response?.data?.userId
        console.log(accessToken)
        setAuth({userId,accessToken})
        navigate("/")

        }catch(err){
            if (!err?.response) {
                setErrMsg('Pas de réponse Serveur');
            } else {
                setErrMsg("l'inscription a échouée")
            }
            errRef.current.focus();
        }


    }

    return (
        <SignUpContainer>

        <p ref={errRef}className={errMsg?"errmsg":"offscreen"}>{errMsg}</p>

            <SignUpFormContainer onSubmit={handleSubmit}>
                <label htmlFor="Nom">Nom
                <span>{validNom ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
                <span>{validNom || !nom ? null : <FontAwesomeIcon icon={faTimes}  />}</span>
                        
                   
                </label>
                <Input 
                    type="text" 
                    id="Nom"
                    ref={userRef}
                    required 
                    onChange={(e)=>setNom(e.target.value)}
                    value={nom}
                    onFocus={() => setNomFocus(true)}
                    onBlur={() => setNomFocus(false)}
                 />
                 {nomFocus && nom && !validNom ? 
                 <p><FontAwesomeIcon icon={faInfoCircle} />
                Ne doit contenir que des lettres</p> : null}
                            

                <label htmlFor="Prenom">Prenom</label>
                <span>{validPrenom ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
                <span>{validPrenom || !prenom ? null : <FontAwesomeIcon icon={faTimes}  />}</span>
                <Input 
                    type="text" 
                    id="Prenom"
                    ref={userRef}
                    required 
                    onChange={(e)=>setPrenom(e.target.value)}
                    value={prenom}
                    onFocus={() => setPrenomFocus(true)}
                    onBlur={() => setPrenomFocus(false)}
                 />
                {prenomFocus && prenom && !validPrenom ? 
                 <p><FontAwesomeIcon icon={faInfoCircle} />
                Ne doit contenir que des lettres</p> : null}
                
                <label htmlFor="email">Email</label>
                <span>{validEmail ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
                <span>{validEmail || !email ? null : <FontAwesomeIcon icon={faTimes}  />}</span>
                <Input 
                    type="email" 
                    id="email"
                    ref={userRef}
                    required 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                 />
                 {emailFocus && email && !validEmail ? 
                 <p><FontAwesomeIcon icon={faInfoCircle} />
                Veuillez saisir un email valide</p> : null}

                <label htmlFor="password">Password</label>
                <span>{validPassword ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
                <span>{validPassword || !password ? null : <FontAwesomeIcon icon={faTimes}  />}</span>
                <Input 
                    type="password" 
                    id="password"
                    required 
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                 />
                 {passwordFocus && password && !validPassword ? 
                 <p><FontAwesomeIcon icon={faInfoCircle} />
                Veuillez saisir un mot de passe contenant au moins</p> : null}

                    <InputButton type="submit" disabled={!validPrenom ||  !validNom || !validEmail || !validPassword ? true : false} value="Valider l'inscription" />
                </SignUpFormContainer>
           
        </SignUpContainer>
    );
};

export default SignUpForm;