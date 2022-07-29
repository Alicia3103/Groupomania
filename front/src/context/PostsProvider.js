import { createContext, useState } from 'react'

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState()
  return (
    <PostsContext.Provider value={ [posts, setPosts] }>
      {children}
    </PostsContext.Provider>
  )
}
export default PostsContext