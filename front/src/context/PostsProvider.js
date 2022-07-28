import { createContext, useState } from 'react'

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
  const [getPosts, setGetPosts] = useState({})
  return (
    <PostsContext.Provider value={{ getPosts, setGetPosts }}>
      {children}
    </PostsContext.Provider>
  )
}
export default PostsContext