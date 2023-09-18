import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

import { api } from "../../utils/MainApi";

function App() {
	const [loggedIn, setLoggedIn] = React.useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	const [authUserEmail, setAuthUserEmail] = React.useState("");

	function handleLogin() {
		setLoggedIn(true);
	}

	const [currentUser, setCurrentUser] = React.useState({
		userName: "",
		userEmail: "",
		_id: "",
	});

	function checkToken() {
		if (localStorage.getItem("jwt")) {
			const jwt = localStorage.getItem("jwt");

			api
				.getContent(jwt)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						setAuthUserEmail(res.email);

						navigate("/movies", { replace: true });
					}
				})
				.catch((err) => {
					console.log(err, "error im checking token");
				});

			return true;
		} else {
			return false;
		}
	}

	function handleSignOut() {
		localStorage.removeItem("jwt");
		setAuthUserEmail("");
		setLoggedIn(false);

		navigate("/signin", { replace: true });
	}

	React.useEffect(() => {
		if (!checkToken()) {
			return;
		}

		api.options.headers["Authorization"] = `Bearer ${localStorage.getItem(
			"jwt"
		)}`;

		api
			.getUserInfo()
			.then((info) => {
				setCurrentUser({
					userName: info.name,
					userEmail: info.email,
					_id: info._id,
				});
			})
			.catch((err) => {
				console.log(err, "error in searching userInfo");
			});
	}, [loggedIn]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header loggedIn={loggedIn} />
				<Routes>
					<Route path="*" element={<Navigate to="/404" replace />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/" element={<Main />} />

					{/* <Route
						path="/movies"
						element={
							loggedIn ? (
								<Navigate to="/main" replace />
							) : (
								<Navigate to="/signin" replace />
							)
						}
					/> */}

					<Route
						path="/movies"
						element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
					/>
					<Route
						path="/saved-movies"
						element={
							<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute
								element={Profile}
								onSignOut={handleSignOut}
								loggedIn={loggedIn}
							/>
						}
					/>
					<Route path="/signin" element={<Login handleLogin={handleLogin} />} />
					<Route path="/signup" element={<Register />} />
				</Routes>

				{loggedIn && location.pathname !== "/profile" && <Footer />}
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
