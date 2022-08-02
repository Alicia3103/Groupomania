import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { PostsReducer } from './PostsReducer'
import { LikesReducer } from './LikesReducer'


export const store = createStore(
  combineReducers({
    posts: PostsReducer,
    likes: LikesReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
