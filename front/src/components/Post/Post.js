import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LikeButton from './LikeButton'
import ModifyButton from './ModifyButton'
import DeleteButton from './DeleteButton'
import { axiosPrivate } from '../../api/axios'

const Image = styled.img`
  width: 60%;
`

function Post({ post }) {
  const { auth } = useAuth()

  const { userId } = auth
  const postUserId = post.UserId
  const { isAdmin } = auth

  const postId = post.Id
  const postTitle = post.Title
  const postContent = post.Content
  const postImageUrl = post.ImageUrl
  const fileInputRef = useRef()
  const [preview, setPreview] = useState('')

  const [editingTitle, setEditingTitle] = useState(postTitle)
  const [editingContent, setEditingContent] = useState(postContent)
  const [editingSelectedFile, setEditingSelectedFile] = useState()
  const [deleteImage,setDeleteImage]=useState(false)

  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    if (isEditing && postImageUrl) console.log('postImageUrl', postImageUrl)
    setPreview(postImageUrl)
  }, [isEditing, postImageUrl])

  useEffect(() => {
    if (editingSelectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(editingSelectedFile)
    } else {
      setPreview(null)
    }
  }, [editingSelectedFile])

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    console.log('deleteImage',deleteImage)
    const editPost = {
      title: editingTitle,
      content: editingContent,
      id: postId,
      deleteImage:deleteImage
    }
    const editPostData = new FormData()

    editPostData.set('post', JSON.stringify(editPost))
    
    editPostData.append('image', editingSelectedFile)

    try {
      axiosPrivate
        .put(`api/post/${postId}`, editPostData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        })
        .then(() => {
          setEditingTitle('')
          setEditingContent('')
          setEditingSelectedFile()
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {!isEditing ? (
        <div className="post" id={post.Id}>
          <h2>{postTitle}</h2>
          {postImageUrl ? (
            <Image
              src={postImageUrl}
              className="post-img"
              id={post.Id}
              alt="img-post"
            />
          ) : null}
          <p>{postContent}</p>
          <div className="author">
            <h5>{post.UserId}</h5>
          </div>
          <div onClick={() => setIsEditing(true)}>
            {userId === postUserId ? <ModifyButton /> : null}
          </div>
          <div>
            {userId === postUserId || isAdmin === 1 ? (
              <DeleteButton post={post} />
            ) : null}
          </div>
          <div>
            <LikeButton post={post} />
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleEdit}>
            <input
              defaultValue={postTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />
            <textarea
              defaultValue={postContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            {preview ? (
              <div><img alt={'preview'} style={{height: '150px'}}src={preview} 
              onClick={(e)=>{ 
                e.preventDefault()
                setDeleteImage(false)
                fileInputRef.current.click()}}/>
              <button onClick={() => {
                setDeleteImage(true)
                  setPreview('')
                }}
              >supprimer l'image</button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setDeleteImage(false)
                  fileInputRef.current.click()
                }}
              >
                Add image
              </button>
            )}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => setEditingSelectedFile(e.target.files[0])}
            />
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      )}
    </div>
  )
}

export default Post
