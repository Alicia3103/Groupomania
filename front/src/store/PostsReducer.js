import { axiosPrivate } from '../api/axios'

const initialState = []

export const ADD_POST_ACTION = 'ADD_POST_ACTION'
export const GET_POST_ACTION = 'GET_POST_ACTION'
export const EDIT_POST_ACTION = 'EDIT_POST_ACTION'
export const DELETE_POST_ACTION = 'DELETE_POST_ACTION'
export const LIKE_POST_ACTION = 'LIKE_POST_ACTION'

export const GET_USER_POST_ACTION = 'GET_USER_POST_ACTION'

export const likePost = (postId, accessToken,userId) => {
  return (dispatch) => {
    return axiosPrivate
      .post(`api/post/${postId}/like`,{
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.nbLike)
        const post={
          id:postId,
          Likes:res.data.nbLike
        }

        dispatch({ type: LIKE_POST_ACTION, payload: post})
      })
      .catch((err) => console.log(err))
  }
}

export const modifyPost = (editPost, editPostData, postId, accessToken) => {
  return (dispatch) => {
    return axiosPrivate
      .put(`api/post/${postId}`, editPostData, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        const imageUrl = res.data.imageUrl
        const post = {
          id: postId,
          Title: editPost.title,
          Content: editPost.content,
          ImageUrl: imageUrl,
        }
        dispatch({ type: EDIT_POST_ACTION, payload: post })
      })
      .catch((err) => console.log(err))
  }
}
export const deletePost = (postId, accessToken) => {
  return (dispatch) => {
    return axiosPrivate
      .delete(`api/post/${postId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: DELETE_POST_ACTION, payload: { postId } })
      })
      .catch((err) => console.log(err))
  }
}

export const addPosts = (data, accessToken) => {
  return (dispatch) => {
    return axiosPrivate
      .post('/api/post', data, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: ADD_POST_ACTION, payload: data })
      })
      .catch((err) => console.log(err))
  }
}

export const getUserPosts = (accessToken) => {
  return (dispatch) => {
    return axiosPrivate
      .get('/api/post/byUser', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_USER_POST_ACTION, payload: res.data.result })
      })
      .catch((err) => console.log(err))
  }
}
export const getPosts = (accessToken) => {
  return (dispatch) => {
    return axiosPrivate
      .get('/api/post', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_POST_ACTION, payload: res.data.result })
      })
      .catch((err) => console.log(err))
  }
}

export function PostsReducer(state = initialState, action) {
  switch (action.type) {
    case LIKE_POST_ACTION:
      return state.map((post) => {
        if (post.Id === action.payload.id) {
          return {
            ...post,
            Likes: action.payload.Likes,
          }
        } else return post
      })
    case ADD_POST_ACTION:
      return [action.payload, ...state]
    case EDIT_POST_ACTION:
      return state.map((post) => {
        if (post.Id === action.payload.id) {
          return {
            ...post,
            Title: action.payload.Title,
            Content: action.payload.Content,
            ImageUrl: action.payload.ImageUrl,
          }
        } else return post
      })
    case DELETE_POST_ACTION:
      return state.filter((post) => post.Id !== action.payload.postId)
    case GET_POST_ACTION:
      return action.payload
    case GET_USER_POST_ACTION:
      return action.payload
    default:
      return state
  }
}
