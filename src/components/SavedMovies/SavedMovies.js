import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Placeholder from "../Placeholder/Placeholder";

function SavedMovies(props) {
	const [searchFlag, setSearchFlag] = React.useState(false);
	const [foundMoviesList, setFoundMoviesList] = React.useState([]);

	function checkResult() {
		return !!localStorage.getItem("searchResultSavedMovies");
	}

	function filterMovies() {
		if (checkResult()) {
			const movieSearchResult = JSON.parse(
				localStorage.getItem("searchResultSavedMovies")
			);

			setSearchFlag(false);
			setFoundMoviesList(searchMovie(movieSearchResult));
		} else {
			setFoundMoviesList(props.savedMoviesList);
		}
	}

	function searchMovie(inputResult) {
		console.log(inputResult);
		const foundMovies = props.savedMoviesList.filter((movie) => {
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
				movie.nameEN.toLowerCase().includes(inputResult.movie.toLowerCase()) ||
				movie.nameRU.toLowerCase().includes(inputResult.movie.toLowerCase())
			);
		});

		console.log(foundMovies);
		return foundMovies;
	}

	React.useEffect(() => {
		filterMovies();
	}, [props.savedMoviesList]);

	React.useEffect(() => {
		filterMovies();
	}, [searchFlag]);

	return (
		<main className="content">
			<section className="saved-movies">
				<SearchForm updateFlag={setSearchFlag} formFor="SavedMovies" />
				{!props.savedMoviesList ? (
					<Preloader />
				) : foundMoviesList.length < 1 ? (
					<Placeholder text="Ничего не найдено" />
				) : (
					<>
						<MoviesCardList
							onMovieDelete={props.onMovieDelete}
							foundSavedMoviesList={foundMoviesList}
							savedMoviesList={props.savedMoviesList}
						/>
					</>
				)}
			</section>
		</main>
	);
}

export default SavedMovies;
