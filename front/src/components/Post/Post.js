

import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import LikeButton from "./LikeButton";
import ModifyButton from "./ModifyButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { axiosPrivate } from "../../api/axios";

const Image =styled.img`

width:60%;
`

const Post = ({ post }) => {
const {auth}=useAuth()
const userId=auth.userId
const postUserId= post.UserId
const isAdmin= auth.isAdmin
const postId=post.Id
const [editingTitle, setEditingTitle] = useState('');
const [editingContent, setEditingContent] = useState('');
const [editingSelectedFile, setEditingSelectedFile] = useState();
    

const [isEditing, setIsEditing]=useState(false)
const handleEdit=()=>{
  setIsEditing(false)
  const editPost={'title': editingTitle,
  'content': editingContent,
  'id':postId
  }
    const editPostData = new FormData()

    editPostData.set("post",JSON.stringify(editPost))
        
    editPostData.append("image",editingSelectedFile)
        
        try{
             axiosPrivate.put('api/post/'+ postId,
              editPostData,{   
                        headers:{'Content-Type':'multipart/form-data'},
                        withCredentials:true
                    })
                    setEditingTitle('')
                    setEditingContent('')
                    setEditingSelectedFile()
                    

        }catch(err){
            console.log(err)
        }


}

const imageUrl=post.ImageUrl
  return (<div>
    {!isEditing ? <div className="post" id={post.Id}>
      <h2>{post.Title}</h2>
      {imageUrl? <Image
        src={imageUrl}
        className="post-img"
        id={post.Id}
        alt="img-post"
      />:null}
      <p>{post.Content}</p>
      <div className="author">
        <h5>{post.UserId}</h5>
      <div onClick={()=>setIsEditing(true)} >{userId===postUserId ? <ModifyButton />:null}</div>
        
        <div>{userId===postUserId || isAdmin===1? <DeleteButton post={post}/>:null}</div>
        <div><LikeButton/>{post.Likes}</div>
      </div>
    </div>:<div>
      <form>
        <input defaultValue={post.Title} onChange={(e) => setEditingTitle(e.target.value)}/>
        <textarea defaultValue={post.Content} onChange={(e) => setEditingContent(e.target.value)}/>
        <input type="file"
          accept=".jpg, .jpeg, .png"
          
          onChange={(e) => setEditingSelectedFile(e.target.files[0])}/>
        <input onClick={handleEdit} type="submit" value='Envoyer'/>
      </form>
      </div>}
      </div>
  );
};

export default Post;
