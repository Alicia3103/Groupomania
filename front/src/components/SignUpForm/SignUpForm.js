import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const SignUpContainer=styled.div`
Background-color:${colors.secondary};
border-radius: 0 10px 10px 10px ;
padding:40px 25px 40px 25px;
`
const SignUpFormContainer=styled.form`
display:flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
height:100%;

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
                    <input type="text" placeholder='Nom' required {...register('nom')} />
                    <input type="text" placeholder='Prénom'required {...register('prenom')} />
                    <input type="email" placeholder='Email'required {...register('email')}/>
                    <input type="password" placeholder='Mot de passe'required {...register('password')} />
                    <input type="submit" value="Valider l'inscription" />
                </SignUpFormContainer>
           
        </SignUpContainer>
    );
};

export default SignUpForm;