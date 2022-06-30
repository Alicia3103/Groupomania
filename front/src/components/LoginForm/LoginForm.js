import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

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

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
           
        axios.post("http://localhost:3080/api/auth/login",data )
        .then((result) => {
            const authToken ="Bearer "+result.data.token
            console.log(authToken)
            axios.defaults.headers.common['Authorization'] =authToken
        })
        .catch((error) => console.log(error))
    }

    return (
        <LogInContainer>
            <LogInFormContainer onSubmit={handleSubmit(onSubmit)}>
                 <Input type="email" placeholder='Email'required {...register('email')}/>
                    <Input type="password" placeholder='Mot de passe'required {...register('password')} />
                    <InputButton type="submit" value="Se connecter" />
                </LogInFormContainer>        
        </LogInContainer>
    );
};

export default LoginForm;