import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import PlaceholderNotFound from "../PlaceholderNotFound/PlaceholderNotFound";
import { movieApi } from "../../utils/MoviesApi";
import { useResize } from "../../utils/UseResize";

function Movies(props) {
	const { width } = useResize();
	const [searchFlag, setSearchFlag] = React.useState(false);
	const [foundMoviesList, setFoundMoviesList] = React.useState([]);
	const [movies, setMovies] = React.useState([]);
	const [countMoviesOnPage, setCountMoviesOnPage] = React.useState(
		width <= 766 ? 5 : width <= 1022 ? 8 : 12
	);
	const [maxFoundMoviesCount, setMaxFoundMoviesCount] = React.useState(0);

	function checkResult() {
		return !!localStorage.getItem("searchResultMovies");
	}

	function filterMovies() {
		setSearchFlag(false);

		if (checkResult()) {
			const movieSearchResult = JSON.parse(
				localStorage.getItem("searchResultMovies")
			);
			if (movieSearchResult.movie === "") {
				return;
			}

			setFoundMoviesList(searchMovie(movieSearchResult));
		}
	}

	function searchMovie(inputResult) {
		const foundMovies = movies.filter((movie) => {
			if (inputResult.toggleSwitch) {
				return (
					movie.duration <= 40 &&
					(movie.nameRU
						.toLowerCase()
						.includes(inputResult.movie.toLowerCase()) ||
						movie.nameEN
							.toLowerCase()
							.includes(inputResult.movie.toLowerCase()))
				);
			}
			return (
				movie.nameRU.toLowerCase().includes(inputResult.movie.toLowerCase()) ||
				movie.nameEN.toLowerCase().includes(inputResult.movie.toLowerCase())
			);
		});

		setMaxFoundMoviesCount(foundMovies.length);
		return foundMovies.slice(0, countMoviesOnPage);
	}

	function handleCalculateShowedMovies() {
		console.log(width, countMoviesOnPage);
		if (width <= 766) {
			setCountMoviesOnPage(countMoviesOnPage + 5);
			console.log("1", countMoviesOnPage + 5);
		} else if (width <= 1022) {
			setCountMoviesOnPage(countMoviesOnPage + 8);
			console.log("2", countMoviesOnPage + 8);
		} else {
			setCountMoviesOnPage(countMoviesOnPage + 12);
			console.log("3", countMoviesOnPage + 12);
		}

		console.log(countMoviesOnPage);
	}

	React.useEffect(() => {
		// console.log(movies);
		filterMovies();
	}, [searchFlag, countMoviesOnPage]);

	React.useEffect(() => {
		movieApi
			.getAllMovies()
			.then((initialMovies) => {
				setMovies(initialMovies);
				setSearchFlag(true);
			})
			.catch((err) => {
				console.log(err, "error in searching movies");
			});
	}, []);

	return (
		<main className="content">
			<section className="movies">
				<SearchForm updateFlag={setSearchFlag} formFor="Movies" />
				{movies.length < 1 ? (
					<Preloader />
				) : foundMoviesList.length < 1 ? (
					<PlaceholderNotFound />
				) : (
					<>
						<MoviesCardList
							onMovieDelete={props.onMovieDelete}
							savedMoviesList={props.savedMoviesList}
							moviesList={foundMoviesList}
							onSaveMovie={props.onSaveMovie}
						/>

						{countMoviesOnPage < maxFoundMoviesCount && (
							<div className="continue-container">
								<button
									className="continue-container__next-btn"
									onClick={handleCalculateShowedMovies}
								>
									Ещё
								</button>
							</div>
						)}
					</>
				)}
			</section>
		</main>
	);
}

export default Movies;
