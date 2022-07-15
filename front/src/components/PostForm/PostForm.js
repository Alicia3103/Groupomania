import React, { useState } from 'react'
import { axiosPrivate } from '../../api/axios'

const POST_URL = 'api/post'
function PostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState()

  const post = { title, content }
  const postData = new FormData()

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
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        {/* faPaperplane */}
        <input className="send" type="submit" value="Envoyer" />
      </form>
    </div>
  )
}

export default PostForm
