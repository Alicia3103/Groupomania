
import React from 'react';
import axios from '../../api/axios';
import { useNavigate,useLocation  } from 'react-router-dom';

import { useRef,useState,useEffect} from 'react';
import useAuth from '../../hooks/useAuth';

import styled from 'styled-components';

import colors from '../../utils/styles/colors';


const LogInContainer=styled.div`
Background-color:${colors.secondary};
height:400px;
box-shadow: 10px 15px 16px 6px rgba(0,0,0,0.51);
border-radius: 0 10px 10px 10px ;
padding:40px 25px 40px 25px;
`
const LogInFormContainer=styled.form`
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
background-color:${colors.primary};
border-radius:15px;
border-color:${colors.primary}
`
const LOGIN_URL='/api/auth/login'

const LoginForm = () => {
    const{setAuth}= useAuth()

    const navigate=useNavigate()
    const location= useLocation()
    const from =location.state?.from?.pathname||"/"

    const userRef=useRef()
    const errRef=useRef()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errMsg,setErrMsg]=useState('')
    

    useEffect(()=>{
        userRef.current.focus();
    },[])
    useEffect(()=>{
        setErrMsg('');
    },[email,password])

    const handleSubmit=async(e)=>{
        e.preventDefault()

    try{
        const response=await axios.post(LOGIN_URL,
            JSON.stringify({email,password}),
            {
                headers:{'Content-Type':'application/json'}, 
                withCredentials: true
            }
        )
        const accessToken = response?.data?.token
        const userId=response?.data?.userId
        setAuth({userId,email,accessToken})

        setEmail('')
        setPassword('')
      
        navigate(from,{replace:true})
    }catch(err){
        if(!err?.response){
            setErrMsg('No Server Response')
        }else if(err.response?.status ===400){
            setErrMsg('Missing email or password') 
        }else if(err.response?.status ===401){
            setErrMsg('UnAuthorized') 
        }else{
            setErrMsg('Login Failed')
        }
        errRef.current.focus()

    }  
    }



    return (
        
        <LogInContainer>
            <p ref={errRef}className={errMsg?"errmsg":"offscreen"}>{errMsg}</p>
            <LogInFormContainer onSubmit={handleSubmit}>
                <label for="email">Email</label>
                 <Input 
                 type="email" 
                 id="email"
                 ref={userRef}
                 required 
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                 />
                 <label for="password">Password</label>
                 <Input 
                 type="password" 
                 id="password"
                 required 
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                 />

                    <InputButton type="submit" value="Se connecter" />
                </LogInFormContainer>        
        </LogInContainer>
    );
};

export default LoginForm;