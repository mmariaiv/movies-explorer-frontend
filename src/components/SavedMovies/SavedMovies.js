import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
	return (
		<section className="saved-movies">
			<SearchForm />
			<MoviesCardList />
		</section>
	);
}

export default SavedMovies;
