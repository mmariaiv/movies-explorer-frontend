import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Placeholder from "../Placeholder/Placeholder";
import { movieApi } from "../../utils/MoviesApi";
import { useResize } from "../../utils/UseResize";

function Movies(props) {
	const { width } = useResize();
	const [searchFlag, setSearchFlag] = React.useState(false);
	const [foundMoviesList, setFoundMoviesList] = React.useState([]);
	const [movies, setMovies] = React.useState([]);
	const [hasInternalServerError, setHasInternalServerError] =
		React.useState(false);
	const [hasValidationSearchError, setHasValidationSearchError] =
		React.useState(false);
	const [numberOfClick, setNumberOfClick] = React.useState(1);
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
				setHasValidationSearchError(true);
				return;
			}

			setHasValidationSearchError(false);
			setFoundMoviesList(searchMovie(movieSearchResult));
		} else {
			setHasValidationSearchError(true);
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
		return foundMovies.slice(0, calculateMoviesOnPage());
	}

	function calculateMoviesOnPage() {
		return (width <= 766 ? 5 : width <= 1022 ? 8 : 12) * numberOfClick;
	}

	function handleCalculateShowedMovies() {
		setNumberOfClick(numberOfClick + 1);
	}

	React.useEffect(() => {
		filterMovies();
	}, [searchFlag, numberOfClick, width]);

	React.useEffect(() => {
		movieApi
			.getAllMovies()
			.then((initialMovies) => {
				setMovies(initialMovies);
				setSearchFlag(true);
				setHasInternalServerError(false);
			})
			.catch((err) => {
				setHasInternalServerError(true);
				console.log(err, "error in searching movies");
			});
	}, []);

	return (
		<main className="content">
			<section className="movies">
				<SearchForm updateFlag={setSearchFlag} formFor="Movies" />
				{hasInternalServerError ? (
					<Placeholder text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" />
				) : movies.length < 1 ? (
					<Preloader />
				) : hasValidationSearchError ? (
					<Placeholder text="Нужно ввести ключевое слово" />
				) : foundMoviesList.length < 1 ? (
					<Placeholder text="Ничего не найдено" />
				) : (
					<>
						<MoviesCardList
							onMovieDelete={props.onMovieDelete}
							savedMoviesList={props.savedMoviesList}
							moviesList={foundMoviesList}
							onSaveMovie={props.onSaveMovie}
						/>

						{calculateMoviesOnPage() < maxFoundMoviesCount && (
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
