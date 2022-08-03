import { axiosPrivate } from "../api/axios"

const initialState = []

export const GET_LIKES_ACTION = 'GET_LIKES_ACTION'

export const getLikes = (accessToken) => {
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

export function LikesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES_ACTION:
      return action.payload
    default:
      return state
  }
}
