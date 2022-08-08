import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import {
  faPaperPlane,
  faImage,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AddPosts, GetPosts } from '../../store/PostsReducer'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

const PostFormContent = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  border-radius:10px;
  border:2px solid ${colors.darkerSecondary};
  margin:10px;
`
const PostFormImage = styled.img`
  align-self: center;
  max-width: 80%;
  max-height:100px
`

const SendButton = styled.button`
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
const AddImageButton = styled.button`
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
const DeleteImageButton = styled.button`
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

function PostForm() {
  const { auth } = useAuth()
  const fileInputRef = useRef()
  const submitInputRef = useRef()
  const [preview, setPreview] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const dispatch = useDispatch()

  const post = { title, content }
  const postData = new FormData()
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }, [selectedFile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    postData.set('post', JSON.stringify(post))

    postData.append('image', selectedFile)

    try {
      await dispatch(AddPosts(postData, auth.accessToken))
      setTitle('')
      setContent('')
      setSelectedFile()

      dispatch(GetPosts(auth.accessToken))
    } catch (err) {
      console.log(err)
    }
  }

  return (
   
      <PostFormContent onSubmit={handleSubmit}>
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
        {preview ? (
          <div>
            <PostFormImage
              alt={'preview'}
              style={{ height: 100 }}
              src={preview}
              onClick={(e) => {
                e.preventDefault()
                fileInputRef.current.click()
              }}
            />
            <DeleteImageButton
              onClick={() => {
                setSelectedFile()
                setPreview('')
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </DeleteImageButton>
          </div>
        ) : (
          <AddImageButton
            onClick={(e) => {
              e.preventDefault()
              fileInputRef.current.click()
            }}
          >
            <FontAwesomeIcon icon={faImage} />
          </AddImageButton>
        )}
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          ref={fileInputRef}
          style={{ display: 'none' }}
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
      </PostFormContent>
    
  )
}

export default PostForm
