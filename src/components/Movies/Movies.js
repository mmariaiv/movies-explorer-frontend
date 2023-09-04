import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
	return (
		<section className="movies">
			<SearchForm />
			<MoviesCardList />

			<div className="continue-container">
				<button className="continue-container__next-btn">Ещё</button>
			</div>

			{/* <Preloader /> */}
		</section>
	);
}

export default Movies;
