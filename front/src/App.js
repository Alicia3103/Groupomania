import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './pages/Connexion'

import { createGlobalStyle } from 'styled-components'
import Home from './pages/Home'
import useInterceptorsAxiosPrivate from './hooks/useInterceptorsAxiosPrivate'
import User from './pages/User'
import RequireAuth from './components/RequireAuth/RequireAuth'
import PersistLogin from './components/PersistLogin'
import Layout from './components/Layout'
import LogOut from './pages/LogOut'
import './utils/styles/normalize.css'
import './utils/styles/index.css'

const App = () => {
  //appel des interceptors
  const interceptorsAxiosPrivate = useInterceptorsAxiosPrivate()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/connexion" element={<Connexion />} />
          {/* application du persistLogin afin de permettre aux utilisateur de rester connecter meme en cas de rechargement de ces pages */}
          <Route path="/" element={<PersistLogin />}>
            {/* Protection des routes avec le RequireAuth afin de garantire l'acces aux pages sécurisées que par les utilisateurs connectés */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Route>
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Connexion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
