import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LikeButton from './LikeButton'
import ModifyButton from './ModifyButton'
import DeleteButton from './DeleteButton'


import { useDispatch, useSelector } from 'react-redux'
import { modifyPost } from '../../store/PostsReducer'

const Image = styled.img`
  width: 60%;
`

function Post({ index }) {
  const { auth } = useAuth()
  const userId = auth.userId
const { isAdmin } = auth.isAdmin


  const dispatch = useDispatch()
  const reduxPosts = useSelector((state) => state.posts)
  
  const post = reduxPosts[index]
  const postUserId = post.UserId
  

  const postId = post.Id
  const postTitle = post.Title
  const postContent = post.Content
  const postImageUrl = post.ImageUrl


  const fileInputRef = useRef()
  const [preview, setPreview] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  const [editingTitle, setEditingTitle] = useState(postTitle)
  const [editingContent, setEditingContent] = useState(postContent)
  const [editingSelectedFile, setEditingSelectedFile] = useState()
  const [deleteImage, setDeleteImage] = useState(false)


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

  const handleEdit = async (e) => {
    e.preventDefault()
    
    setIsEditing(false)
  
    
    const editPost = {
      title: editingTitle,
      content: editingContent,
      id: postId,
      deleteImage: deleteImage,
    }

    const editPostData = new FormData()

    editPostData.set('post', JSON.stringify(editPost))

    editPostData.append('image', editingSelectedFile)

    try {
      
      await dispatch(modifyPost(editPost, editPostData, postId,auth.accessToken))

      setEditingTitle('')
      setEditingContent('')
      setEditingSelectedFile()
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
            <h5>
              {post.Nom} {post.Prenom}
            </h5>
          </div>
          <div onClick={() => setIsEditing(true)}>
            {userId === postUserId || isAdmin === 1 ? <ModifyButton /> : null}
          </div>
          <div>
            {userId === postUserId || isAdmin === 1 ? (
              <DeleteButton index={index} />
            ) : null}
          </div>
          <div>
            <LikeButton index={index} />
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
              <div>
                <img
                  alt={'preview'}
                  style={{ height: '150px' }}
                  src={preview}
                  onClick={(e) => {
                    e.preventDefault()
                    setDeleteImage(false)
                    fileInputRef.current.click()
                  }}
                />
                <button
                  onClick={() => {
                    setDeleteImage(true)
                    setPreview('')
                  }}
                >
                  supprimer l'image
                </button>
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
