import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import PlaceholderNotFound from "../PlaceholderNotFound/PlaceholderNotFound";

function SavedMovies(props) {
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
		const foundMovies = props.savedMoviesList.filter((movie) => {
			if (inputResult.toggleSwitch) {
				return (
					movie.duration <= 40 &&
					(movie.nameRU.includes(inputResult.movie) ||
						movie.nameEN.includes(inputResult.movie))
				);
			}
			return (
				movie.nameEN.includes(inputResult.movie) ||
				movie.nameRU.includes(inputResult.movie)
			);
		});

		return foundMovies;
	}

	React.useEffect(() => {
		filterMovies();
	}, [searchFlag]);

	return (
		<main className="content">
			<section className="saved-movies">
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
						/>
					</>
				)}
			</section>
		</main>
	);
}

export default SavedMovies;
