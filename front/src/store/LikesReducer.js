const initialState = []

export const GET_LIKES_ACTION = 'GET_LIKES_ACTION'

export function LikesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES_ACTION:
      return [state, 'like']

    default:
      return state
  }
}
