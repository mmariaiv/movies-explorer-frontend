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
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [isUserLoaded, setIsUserLoaded] = React.useState(false);

	const [savedMovies, setSavedMovies] = React.useState([]);

	const location = useLocation();
	const navigate = useNavigate();

	function handleLogin() {
		setLoggedIn(true);
	}

	const [currentUser, setCurrentUser] = React.useState({
		userName: "",
		userEmail: "",
		_id: "",
	});

	function checkToken() {
		if (loggedIn) {
			return true;
		}

		if (localStorage.getItem("jwt")) {
			const jwt = localStorage.getItem("jwt");
			const curentPath = location.pathname;

			api
				.getContent(jwt)
				.then((res) => {
					if (res) {
						setLoggedIn(true);

						navigate(curentPath, { replace: true });
					}
				})
				.catch((err) => {
					console.log(err, "error in checking token");
				});

			return true;
		} else {
			setIsUserLoaded(true);
			return false;
		}
	}

	function handleUpdateUser(newUserInfo) {
		return api.changeUserInfo(newUserInfo).then((res) => {
			setCurrentUser({
				userEmail: res.email,
				userName: res.name,
				_id: res._id,
			});
		});
	}

	function handleSignOut() {
		localStorage.clear();
		setLoggedIn(false);
		setIsUserLoaded(false);

		navigate("/", { replace: true });
	}

	function handleMovieDelete(movieId) {
		savedMovies.forEach((savedMovie) => {
			if (savedMovie.movieId === movieId) {
				api
					.deteleMovie(savedMovie._id)
					.then((res) => {
						setSavedMovies((state) => {
							return savedMovies.filter((c) => savedMovie._id !== c._id);
						});
					})
					.catch((err) => {
						console.log(err, "error in deleting saved movie");
					});
			}
		});
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
			})
			.finally(() => {
				setIsUserLoaded(true);
			});

		api
			.getMovies()
			.then((movies) => {
				const currentMoviesList = Array.from(movies.data);
				setSavedMovies(currentMoviesList);
			})
			.catch((err) => {
				console.log(err, "error in searching saved movies");
			});
	}, [loggedIn]);

	function handleMovieSave(newMovieInfo) {
		api
			.addMovie(newMovieInfo)
			.then((res) => {
				setSavedMovies([res.data, ...savedMovies]);
			})
			.catch((err) => {
				console.log(err, "error in saving new movie");
			});
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header loggedIn={loggedIn} />
				<Routes>
					<Route path="*" element={<Navigate to="/404" replace />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/" element={<Main />} />

					<Route
						path="/movies"
						element={
							<ProtectedRoute
								element={Movies}
								loggedIn={loggedIn}
								isUserLoaded={isUserLoaded}
								onMovieDelete={handleMovieDelete}
								onSaveMovie={handleMovieSave}
								savedMoviesList={savedMovies}
							/>
						}
					/>
					<Route
						path="/saved-movies"
						element={
							<ProtectedRoute
								element={SavedMovies}
								savedMoviesList={savedMovies}
								loggedIn={loggedIn}
								isUserLoaded={isUserLoaded}
								onMovieDelete={handleMovieDelete}
							/>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute
								element={Profile}
								onSignOut={handleSignOut}
								loggedIn={loggedIn}
								isUserLoaded={isUserLoaded}
								onUpdateUser={handleUpdateUser}
							/>
						}
					/>
					<Route
						path="/signin"
						element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
					/>
					<Route
						path="/signup"
						element={<Register loggedIn={loggedIn} handleLogin={handleLogin} />}
					/>
				</Routes>

				{loggedIn &&
					location.pathname !== "/profile" &&
					location.pathname !== "/404" && <Footer />}
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
