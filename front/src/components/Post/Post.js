import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LikeButton from './LikeButton'
import ModifyButton from './ModifyButton'
import DeleteButton from './DeleteButton'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux'
import { ModifyPost } from '../../store/PostsReducer'
import colors from '../../utils/styles/colors'

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid ${colors.darkerSecondary};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`
const PostTextTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 7px;
`
const PostTextContent = styled.p`
  margin: 2%;
`
const PostTextAuthor = styled.h2`
  font-size: 14px;
  font-style: italic;
`
const PostButtons = styled.div`
  display: flex;
`

const PostImage = styled.img`
  align-self: center;
  max-width: 80%;
  max-height: 350px;
`

const EditPostContent = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
`
const EditPostImage = styled.img`
  align-self: center;
  max-width: 80%;
  max-height: 100px;
`
const DeleteImageButtonContainer = styled.button`
color:${colors.secondary};
margin-left:8px
box-shadow: 0px 10px 14px -7px #276873;
font-size:14px;
background-color:${colors.darkerSecondary};
border-radius:6px;
border:none;
width:22px;
height:22px;
`
const AddImageButtonContainer = styled.button`
color:${colors.secondary};
margin-left:8px
box-shadow: 0px 10px 14px -7px #276873;
font-size:14px;
background-color:${colors.darkerSecondary};
border-radius:6px;
border:none;
width:22px;
height:22px;
`

function Post({ index }) {
  const { auth } = useAuth()
  const userId = auth.userId
  const isAdmin = auth.isAdmin

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

  const [editingTitle, setEditingTitle] = useState('')
  const [editingContent, setEditingContent] = useState('')
  const [editingSelectedFile, setEditingSelectedFile] = useState()
  const [deleteImage, setDeleteImage] = useState(false)

  useEffect(() => {
    if (isEditing && postImageUrl) console.log('postImageUrl', postImageUrl)
    setPreview(postImageUrl)
    if (isEditing) {
      setEditingTitle(postTitle)
      setEditingContent(postContent)
    }
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

    const editPost = {
      title: editingTitle,
      content: editingContent,
      id: postId,
      deleteImage: deleteImage,
    }

    const editPostData = new FormData()

    editPostData.set('post', JSON.stringify(editPost))

    editPostData.append('image', editingSelectedFile)

    dispatch(ModifyPost(editPost, editPostData, postId, auth.accessToken))
    setIsEditing(false)
  }

  return (
    <PostContainer>
      {!isEditing ? (
        <PostContent className="post" id={post.Id}>
          <PostTextTitle className="post_title">{postTitle}</PostTextTitle>
          {postImageUrl ? (
            <PostImage
              src={postImageUrl}
              className="post-img"
              id={post.Id}
              alt="img-post"
            />
          ) : null}
          <PostTextContent className="post_content">
            {postContent}
          </PostTextContent>
          <PostTextAuthor className="author">
            {post.Nom} {post.Prenom}
          </PostTextAuthor>
          <PostButtons className="post_buttons">
            <div className="post_like">
              <LikeButton index={index} />
            </div>
            <div className="post_edit" onClick={() => setIsEditing(true)}>
              {userId === postUserId || isAdmin === 1 ? <ModifyButton /> : null}
            </div>
            <div className="post_delete">
              {userId === postUserId || isAdmin === 1 ? (
                <DeleteButton index={index} />
              ) : null}
            </div>
          </PostButtons>
        </PostContent>
      ) : (
        <EditPostContent onSubmit={handleEdit}>
          <input
            defaultValue={postTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />

          {preview ? (
            <div>
              <EditPostImage
                alt={'preview'}
                src={preview}
                onClick={(e) => {
                  e.preventDefault()
                  setDeleteImage(false)
                  fileInputRef.current.click()
                }}
              />
              <DeleteImageButtonContainer
                onClick={() => {
                  setDeleteImage(true)
                  setPreview('')
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </DeleteImageButtonContainer>
            </div>
          ) : (
            <AddImageButtonContainer
              onClick={(e) => {
                e.preventDefault()
                setDeleteImage(false)
                fileInputRef.current.click()
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </AddImageButtonContainer>
          )}
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={(e) => setEditingSelectedFile(e.target.files[0])}
          />
          <textarea
            defaultValue={postContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <input type="submit" value="Envoyer" />
        </EditPostContent>
      )}
    </PostContainer>
  )
}

export default Post
