import React from 'react';

const UserInfo = () => {
    return (
        <div className='userInfoContainer'>
            <div className="userInfo">
            <p className='nomPrenom'>Nom Prénom</p>
            <p className='mail'>nom.prenom@email.fr</p>
            </div>
            <button className='desactiverCompte'>Désactiver le compte</button>
        </div>
    );
};

export default UserInfo;