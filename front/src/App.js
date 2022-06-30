import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Connexion from "./pages/Connexion";

import { createGlobalStyle } from 'styled-components'
import Home from "./pages/Home";

import User from "./pages/User";

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
		<GlobalStyle/>
		<Routes>
			<Route path="/accueil" element={<Home/>} />
			<Route path="/connexion" element={<Connexion/>} />
			<Route path="/user" element={<User/>} />
			{/*pour tout url qui ne correspond pas a ce declaré au dessus*/}
			<Route path="*" element={<Connexion/>} />
		</Routes>
		</BrowserRouter>
	)
};

export default App;
