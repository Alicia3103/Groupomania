import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpForm = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
           
        axios.post("http://localhost:3080/api/auth/signup",data )
        .then((result) => {
            console.log(result.data.message)
            //ajouter les infos d'authentification dans le back fonction signup pour log k'utilisteur apres creation compte
        })
        .catch((error) => console.log(error))
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h3>S'inscrire</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='Nom' required {...register('nom')} />
                    <input type="text" placeholder='Prénom'required {...register('prenom')} />
                    <input type="email" placeholder='Email'required {...register('email')}/>
                    <input type="password" placeholder='Mot de passe'required {...register('password')} />
                    <input type="submit" value="Valider l'inscription" />
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;