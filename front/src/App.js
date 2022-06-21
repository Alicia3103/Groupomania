import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import User from "./pages/User";

const App = () => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/connexion" element={<Connexion/>} />
			<Route path="/user" element={<User/>} />
			{/*pour tout url qui ne correspond pas a ce declaré au dessus*/}
			<Route path="*" element={<Connexion/>} />
		</Routes>
		</BrowserRouter>
	)
};

export default App;
