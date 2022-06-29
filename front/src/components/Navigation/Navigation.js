import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/accueil">
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/user">
                    <li>Page perso</li>
                </NavLink>
                <NavLink to="">
                    <li>Deconnexion</li>
                </NavLink>
            </ul>
            
        </div>
    );
};

export default Navigation;