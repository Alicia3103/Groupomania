import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { AuthProvider } from './context/AuthProvider'
import { PostsProvider } from './context/PostsProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
       <PostsProvider>
    <App />
    </PostsProvider>
  </AuthProvider>
)
