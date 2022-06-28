import React from 'react';
import {Link} from 'react-router-dom';
const SignUpForm = () => {
    return (
        <div className='LoginForm'>
            <form  onSubmit="" action="" method="post">
                 <h1>Inscription</h1>
                 <div className="loginInfo">
                     <label htmlFor="">Nom</label>
                     <input type="text"  />
                 </div>
                 <div className="loginInfo">
                     <label htmlFor="">Prénom</label>
                     <input type="text"  />
                 </div>
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
                  
                <Link to={"/connexion"}>
                     Déjà inscrit?<button>Connectez-vous!</button>
                     </Link>
                 
        </div>
    );
};

export default SignUpForm;