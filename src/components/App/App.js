import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentLoginContext } from "../../contexts/CurrentLoginContext";

function App() {
	const [loggedIn, setLoggedIn] = React.useState(true);
	const location = useLocation();

	return (
		<CurrentLoginContext.Provider value={loggedIn}>
			<div className="page">
				<Header />
				<Routes>
					<Route path="*" element={<Navigate to="/404" replace />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/" element={<Main />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/saved-movies" element={<SavedMovies />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/signin" element={<Login />} />
					<Route path="/signup" element={<Register />} />
				</Routes>

				{((loggedIn && location.pathname !== "/profile") ||
					location.pathname === "/movies" ||
					location.pathname === "/saved-movies" ||
					location.pathname === "/") && <Footer />}
			</div>
		</CurrentLoginContext.Provider>
	);
}

export default App;
