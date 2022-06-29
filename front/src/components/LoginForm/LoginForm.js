import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const LogInContainer=styled.div`
Background-color:${colors.secondary};
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
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                 <input type="email" placeholder='Email'required {...register('email')}/>
                    <input type="password" placeholder='Mot de passe'required {...register('password')} />
                    <input type="submit" value="Se connecter" />
                </form>        
        </LogInContainer>
    );
};

export default LoginForm;