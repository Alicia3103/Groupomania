import React, { useEffect, useRef, useState } from 'react'
import { axiosPrivate } from '../../api/axios'

const POST_URL = 'api/post'
function PostForm() {
  const fileInputRef = useRef()
  const [preview,setPreview]=useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  

  const post = { title, content }
  const postData = new FormData()
useEffect(()=>{
  if(selectedFile){
    const reader =new FileReader()
    reader.onload=()=>{
      setPreview(reader.result)
    }
    reader.readAsDataURL(selectedFile)
  }else{
    setPreview(null)
  }
},[selectedFile])
  const handleSubmit = async (e) => {
    e.preventDefault()
    postData.set('post', JSON.stringify(post))

    postData.append('image', selectedFile)

    try {
      await axiosPrivate.post(POST_URL, postData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      setTitle('')
      setContent('')
      setSelectedFile()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Contenu</label>
        <textarea
          id="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        {preview?<div><img alt={'preview'} style={{height: 100}}src={preview} onClick={(e)=>{ e.preventDefault()
          fileInputRef.current.click()}}/><button onClick={() => {
        setSelectedFile()
          setPreview('')
        }}
      >supprimer l'image</button></div>:
        <button onClick={(e)=>{
          e.preventDefault()
          fileInputRef.current.click()
        }}>Add image</button>}
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{display:"none"}}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          ref={fileInputRef}
        />
        {/* faPaperplane */}
        <input className="send" type="submit" value="Envoyer" />
      </form>
    </div>
  )
}

export default PostForm
