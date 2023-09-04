import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
	return (
		<section className="moviescardlist">
			<div className="movies-list">
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
			</div>
		</section>
	);
}

export default MoviesCardList;
