import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import colors from '../../utils/styles/colors';

const UserInfoContainer=styled.div`
height:300px;
width:100%;
background-color:${colors.secondary};
border-radius:10px;
`
const UserInfo = () => {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const USER_URL='/api/auth/user'

        const getUser = async () => {

            try {
                const response = await axiosPrivate.get(USER_URL, {
                    signal: controller.signal
                });
               
                isMounted && setUser(response.data.result[0]);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                
            }
        }

        getUser();
        

        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, [])



    return (
        <UserInfoContainer>
            <div className="userInfo">
            <p className='nomPrenom'>{user?.Nom} {user?.Prenom}</p>
            <p className='mail'>{user?.Email}</p>
            </div>
            <button className='desactiverCompte'>Désactiver le compte</button>
        </UserInfoContainer>
    );
};

export default UserInfo;