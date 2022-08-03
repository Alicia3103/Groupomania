import { axiosPrivate } from '../api/axios'

const initialState = []

export const GET_LIKES_ACTION = 'GET_LIKES_ACTION'
export const ADD_LIKE_ACTION = 'ADD_LIKE_ACTION'

export function GetLikes(accessToken) {
  return (dispatch) => {
    return axiosPrivate
      .get('/api/post/like', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_LIKES_ACTION, payload: res.data.arrayPostId })
      })
      .catch((err) => console.log(err))
  }
}
export function AddLike(postId) {
  return (dispatch) => {
    return dispatch({ type: ADD_LIKE_ACTION, payload: postId })
  }
}

export function LikesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES_ACTION:
      return action.payload
    case ADD_LIKE_ACTION:
      if (state.includes(action.payload)) {
        return state.filter((likes) => likes !== action.payload)
      }
      console.log(action.payload)
      return [action.payload, ...state]
    default:
      return state
  }
}
