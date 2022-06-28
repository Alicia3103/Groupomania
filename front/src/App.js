import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import User from "./pages/User";

const App = () => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/accueil" element={<Home/>} />
			<Route path="/connexion" element={<LogIn/>} />
			<Route path="/inscription" element={<SignUp />} />
			<Route path="/user" element={<User/>} />
			{/*pour tout url qui ne correspond pas a ce declaré au dessus*/}
			<Route path="*" element={<LogIn/>} />
		</Routes>
		</BrowserRouter>
	)
};

export default App;
