import React from 'react';
import {Link} from 'react-router-dom';
const LoginForm = () => {
    return (
        <div className='LoginForm'>
            <form  onSubmit="" action="" method="post">
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
                  
                <Link to={"/inscription"}>
                     Nouveau?<button>Inscrivez-vous!</button>
                     </Link>
                 
        </div>
    );
};

export default LoginForm;