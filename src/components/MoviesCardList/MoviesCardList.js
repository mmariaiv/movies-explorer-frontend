import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
	const location = useLocation();

	React.useEffect(() => {
		console.log(props.savedMoviesList);
	});
	return (
		<section className="moviescardlist">
			<div className="movies-list">
				{location.pathname === "/saved-movies" &&
					props?.savedMoviesList?.map((savedMovie) => {
						console.log(savedMovie);
						return (
							<MoviesCard
								key={savedMovie.id}
								movie={savedMovie}
								onCardDelete={props.onCardDelete}
								savedMovies={props.savedMoviesList}
							/>
						);
					})}
				{props.moviesList &&
					props.moviesList.map((foundMovie) => {
						return (
							<MoviesCard
								key={foundMovie._id}
								movie={foundMovie}
								onMovieDelete={props.onMovieDelete}
								onSaveMovie={props.onSaveMovie}
								savedMovies={props.savedMoviesList}
							/>
						);
					})}
			</div>
		</section>
	);
}

export default MoviesCardList;
