import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LikeButton from './LikeButton'
import ModifyButton from './ModifyButton'
import DeleteButton from './DeleteButton'
import {
  faPaperPlane,
  faImage,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
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
  align-items: center;
  width: 100%;
  border: 2px solid ${colors.darkerSecondary};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`
const EditPostImage = styled.img`
  align-self: center;
  max-width: 80%;
  max-height: 100px;
`
const TitleInput = styled.input`
  width: 60%;
  margin: 5px;
`
const ContentInput = styled.textarea`
  width: 80%;
  height: 50%;
  margin: 5px;
`

const ButtonContainer = styled.button`
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
const SendButton = styled.button`
color:${colors.secondary};
margin-left:8px
box-shadow: 0px 10px 14px -7px #276873;
font-size:16px;
background-color:${colors.darkerSecondary};
border-radius:6px;
border:none;
width:32px;
min-height:28px;
align-self: flex-end;
margin: 2px  10% 2px 2px

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
  const submitInputRef = useRef()
  const [preview, setPreview] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  const [editingTitle, setEditingTitle] = useState('')
  const [editingContent, setEditingContent] = useState('')
  const [editingSelectedFile, setEditingSelectedFile] = useState()
  const [deleteImage, setDeleteImage] = useState(false)

  //si edit du post affichage du preview de l'image et préremplissage avec le contenu des champs
  useEffect(() => {
    if (isEditing && postImageUrl) {
      setPreview(postImageUrl)
    }

    if (isEditing) {
      setEditingTitle(postTitle)
      setEditingContent(postContent)
    }
  }, [isEditing, postImageUrl])

  //affichage en direct de l'image choisit
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

    //ajout des contenu de l'edition dans un formdata puis appel de la fonction modifiaction du post
    const editPostData = new FormData()

    editPostData.set('post', JSON.stringify(editPost))

    editPostData.append('image', editingSelectedFile)

    dispatch(ModifyPost(editPost, editPostData, postId, auth.accessToken))
    setIsEditing(false)
  }

  return (
    <PostContainer>
      {/*affichage du post si pas en cours d'edition sinon affichage du formulaire de modification */}
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
          <label htmlFor="title">Titre</label>
          <TitleInput
            type="text"
            id="title"
            defaultValue={postTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <label htmlFor="content">Contenu</label>
          <ContentInput
            id="content"
            defaultValue={postContent}
            onChange={(e) => setEditingContent(e.target.value)}
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
              <ButtonContainer
                onClick={() => {
                  setDeleteImage(true)
                  setPreview('')
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </ButtonContainer>
            </div>
          ) : (
            <ButtonContainer
              onClick={(e) => {
                e.preventDefault()
                setDeleteImage(false)
                fileInputRef.current.click()
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </ButtonContainer>
          )}

          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={(e) => setEditingSelectedFile(e.target.files[0])}
          />
          <input
            className="send"
            type="submit"
            value="Envoyer"
            ref={submitInputRef}
            style={{ display: 'none' }}
          />
          <SendButton
            onClick={(e) => {
              e.preventDefault()
              submitInputRef.current.click()
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendButton>
        </EditPostContent>
      )}
    </PostContainer>
  )
}

export default Post
