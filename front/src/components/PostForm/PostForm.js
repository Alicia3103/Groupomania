import React, { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
const POST_URL='api/post'
const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isImage,setIsImage]=useState(false)
    const {auth}=useAuth()
    const userId=auth.userId

    const postData = new FormData()
    
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        postData.set('titre', title)
        postData.set('content', content)
        postData.set('userId',userId)
        if(isImage){
            postData.append("file",selectedFile)
        }

        try{
            const response = await axiosPrivate.post(POST_URL,
               postData,
                    {
                        headers:{'Content-Type':'multipart/form-data'},
                        withCredentials:true
                    })
       

        }catch(err){
            console.log(err)
        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>

        <label htmlFor='title'>Titre</label>
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='content'>Contenu</label>
        <textarea
          id='content'
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          
          onChange={(e) => {
            setSelectedFile(e.target.files[0])
            setIsImage(true)}}
        />
         <input className='send' type = "submit" id='post-submit' value='Envoyer'/>
      </form>
        </div>
    );
};

export default PostForm;