import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
background-color:#ff9191;
border-radius:15px;
border-color:#ff9191;
`
const SignUpForm = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
           
        axios.post("http://localhost:3080/api/auth/signup",data )
        .then((result) => {
            console.log(result.data.message)

            //ajouter les infos d'authentification dans le back fonction signup pour log k'utilisteur apres creation compte  
            axios.post("http://localhost:3080/api/auth/login",data )
                .then((result) => {
                        const authToken ="Bearer "+result.data.token
                        console.log(authToken)
                        axios.defaults.headers.common['Authorization'] =authToken  
                    })
        })
        .catch((error) => console.log(error))
    }

    return (
        <SignUpContainer>

                <SignUpFormContainer onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" placeholder='Nom' required {...register('nom')} />
                    <Input type="text" placeholder='Prénom'required {...register('prenom')} />
                    <Input type="email" placeholder='Email'required {...register('email')}/>
                    <Input type="password" placeholder='Mot de passe'required {...register('password')} />
                    <InputButton type="submit" value="Valider l'inscription" />
                </SignUpFormContainer>
           
        </SignUpContainer>
    );
};

export default SignUpForm;