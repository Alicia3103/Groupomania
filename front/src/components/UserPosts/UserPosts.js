import React, { useEffect, useState } from 'react';
import axios from "axios"

const UserPosts=()=>{
    const [data,setData]= useState([]);
    useEffect(()=>{
        axios
        .get("http://localhost:3080/api/post/byUser")
        .then((res)=> setData(res.data))
    },[])

    return (
        <div className='userPostContainer'>
            <div className="userPosts">
        {console.log(data.result)}
            </div>
            
        </div>
    );
};

export default UserPosts;