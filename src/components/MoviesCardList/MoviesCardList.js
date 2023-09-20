import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
	const location = useLocation();

	return (
		<section className="moviescardlist">
			<div className="movies-list">
				{location.pathname === "/saved-movies" &&
					props?.foundSavedMoviesList?.map((savedMovie) => {
						return (
							<MoviesCard
								key={savedMovie.id}
								movie={savedMovie}
								onMovieDelete={props.onMovieDelete}
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
