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
	const [isLoading, setIsLoading] = React.useState(false);
	const [hasInternalServerError, setHasInternalServerError] =
		React.useState(false);
	const [numberOfClick, setNumberOfClick] = React.useState(0);
	const [maxFoundMoviesCount, setMaxFoundMoviesCount] = React.useState(0);

	function filterMovies() {
		setSearchFlag(false);

		const movieSearchResult = JSON.parse(
			localStorage.getItem("searchResultMovies")
		);

		setIsLoading(true);
		movieApi
			.getAllMovies()
			.then((initialMovies) => {
				setHasInternalServerError(false);
				setFoundMoviesList(searchMovie(movieSearchResult, initialMovies));
			})
			.catch((err) => {
				setHasInternalServerError(true);
				console.log(err, "error in searching movies");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function searchMovie(inputResult, movies) {
		const foundMovies = movies.filter((movie) => {
			if (inputResult?.toggleSwitch) {
				return (
					movie.duration <= 40 &&
					(movie.nameRU
						.toLowerCase()
						.includes(inputResult?.movie.toLowerCase()) ||
						movie.nameEN
							.toLowerCase()
							.includes(inputResult?.movie.toLowerCase()))
				);
			}
			return (
				movie.nameRU.toLowerCase().includes(inputResult?.movie.toLowerCase()) ||
				movie.nameEN.toLowerCase().includes(inputResult?.movie.toLowerCase())
			);
		});

		setMaxFoundMoviesCount(foundMovies.length);
		return foundMovies.slice(0, calculateMoviesOnPage());
	}

	function calculateMoviesOnPage() {
		const minimumCardsOnPage = width <= 766 ? 5 : width <= 1022 ? 8 : 12;
		return (width <= 1022 ? 2 : 3) * numberOfClick + minimumCardsOnPage;
	}

	function handleCalculateShowedMovies() {
		setNumberOfClick(numberOfClick + 1);
	}

	React.useEffect(() => {
		filterMovies();
	}, [searchFlag, numberOfClick, width]);

	React.useEffect(() => {
		filterMovies();
	}, []);

	React.useEffect(() => {
		setNumberOfClick(0);
	}, [searchFlag]);

	return (
		<main className="content">
			<section className="movies">
				<SearchForm updateFlag={setSearchFlag} formFor="Movies" />
				{hasInternalServerError ? (
					<Placeholder text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" />
				) : isLoading ? (
					<Preloader />
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
