import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const UserInfoContainer=styled.div`
height:300px;
width:100%;
background-color:${colors.secondary};
border-radius:10px;
`
const UserInfo = () => {
    return (
        <UserInfoContainer>
            <div className="userInfo">
            <p className='nomPrenom'>Nom Prénom</p>
            <p className='mail'>nom.prenom@email.fr</p>
            </div>
            <button className='desactiverCompte'>Désactiver le compte</button>
        </UserInfoContainer>
    );
};

export default UserInfo;