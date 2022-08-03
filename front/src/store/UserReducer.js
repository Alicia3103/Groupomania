import { axiosPrivate } from '../api/axios'

const initialState = []

export const GET_USER_ACTION = 'GET_USER_ACTION'
export const UNACTIVE_USER_ACTION = 'UNACTIVE_USER_ACTION'

export function GetUserInfos(accessToken) {
  return (dispatch) => {
    return axiosPrivate
      .get('/api/auth/user', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const user = res.data.user

        dispatch({ type: GET_USER_ACTION, payload: user })
      })
      .catch((err) => console.log(err))
  }
}
export function UnactiveUser(accessToken) {
  return (dispatch) => {
    return axiosPrivate
      .put('/api/auth/unactiveAccount', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: UNACTIVE_USER_ACTION, payload: '' })
      })
      .catch((err) => console.log(err))
  }
}

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACTION:
      return action.payload
    case UNACTIVE_USER_ACTION:
      return state
    default:
      return state
  }
}
