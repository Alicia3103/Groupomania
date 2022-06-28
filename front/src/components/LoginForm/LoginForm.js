import React from 'react';

const LoginForm = () => {
    return (
        <div className='LoginForm'>
            <form >
                 <h1>Connexion</h1>
                 <div className="loginInfo">
                     <label htmlFor="">email</label>
                     <input type="email"  />
                 </div>
                 <div className="loginInfo">
                     <label htmlFor="">mot de passe</label>
                     <input type="password"  />
                 </div>
                 <button>connexion</button>
                
                </form>
             
                 
        </div>
    );
};

export default LoginForm;