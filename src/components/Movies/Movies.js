import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import PlaceholderNotFound from "../PlaceholderNotFound/PlaceholderNotFound";
import { movieApi } from "../../utils/MoviesApi";

function Movies(props) {
	const [searchFlag, setSearchFlag] = React.useState(false);
	const [foundMoviesList, setFoundMoviesList] = React.useState();
	const [movies, setMovies] = React.useState([]);

	function checkResult() {
		return !!localStorage.getItem("searchResult");
	}

	function filterMovies() {
		setSearchFlag(false);

		if (checkResult()) {
			const movieSearchResult = JSON.parse(
				localStorage.getItem("searchResult")
			);
			setFoundMoviesList(searchMovie(movieSearchResult));
		}
	}

	function searchMovie(inputResult) {
		const foundMovies = movies.filter((movie) => {
			if (inputResult.toggleSwitch) {
				return (
					movie.duration <= 40 &&
					(movie.nameRU.includes(inputResult.movie) ||
						movie.nameEN.includes(inputResult.movie))
				);
			}
			return (
				movie.nameRU.includes(inputResult.movie) ||
				movie.nameEN.includes(inputResult.movie)
			);
		});

		return foundMovies;
	}

	React.useEffect(() => {
		// console.log(movies);
		filterMovies();
	}, [searchFlag]);

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

	// React.useEffect(() => {
	// 	filterMovies();
	// });
	return (
		<main className="content">
			<section className="movies">
				<SearchForm updateFlag={setSearchFlag} />
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

						<div className="continue-container">
							<button className="continue-container__next-btn">Ещё</button>
						</div>
					</>
				)}
			</section>
		</main>
	);
}

export default Movies;
