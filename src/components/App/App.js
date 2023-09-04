import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
	const location = useLocation();
	const [loggedIn, setLoggedIn] = React.useState(false);
	return (
		<div className="page">
			{loggedIn || (location.pathname === "/profile" && <Header />)}
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/saved-movies" element={<SavedMovies />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/signup" element={<Register />} />
			</Routes>

			{loggedIn && <Footer />}
		</div>
	);
}

export default App;
