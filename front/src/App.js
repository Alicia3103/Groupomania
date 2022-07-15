import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './pages/Connexion'

import { createGlobalStyle } from 'styled-components'
import Home from './pages/Home'

import User from './pages/User'
import RequireAuth from './components/RequireAuth/RequireAuth'
import Layout from './components/Layout'
import LogOut from './pages/LogOut'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
		font-size:14px;
        box-sizing: border-box;
        margin:0;
        padding:0;
    }
`

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/connexion" element={<Connexion />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Connexion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
