import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
	return (
		<main className="content">
			<section className="saved-movies">
				<SearchForm />
				<MoviesCardList />
			</section>
		</main>
	);
}

export default SavedMovies;
