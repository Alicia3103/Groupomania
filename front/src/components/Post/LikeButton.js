import React from 'react';
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'

const LikeButton = () => {
    const handleClick=()=>{
        console.log("liké")
      }

    return (
        <div>
            <FontAwesomeIcon onClick={handleClick} icon={faThumbsUp}></FontAwesomeIcon>
        </div>
    );
};

export default LikeButton;