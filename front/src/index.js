import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { AuthProvider } from './context/AuthProvider'

import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
)
