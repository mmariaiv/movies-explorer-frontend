import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResize } from "../../utils/UseResize";

function MoviesCard({ movie, onMovieDelete, onSaveMovie, savedMovies }) {
	const [isSaved, setIsSaved] = React.useState(false);
	const location = useLocation();
	const [isMoused, setIsMoused] = React.useState(false);
	const { width } = useResize();

	function handleDeleteClick() {
		if (movie._id) {
			onMovieDelete(movie.movieId);
		} else {
			onMovieDelete(movie.id);
		}
	}

	function handleSaveClick() {
		onSaveMovie(movie);
	}

	function calcDuration() {
		return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
	}

	function handleMouse() {
		setIsMoused(!isMoused);
	}

	function checkSaving() {
		if (savedMovies) {
			setIsSaved(
				savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)
			);
		}
	}

	React.useEffect(() => {
		checkSaving();
	});

	return (
		<div
			className="moviescard"
			onMouseEnter={handleMouse}
			onMouseLeave={handleMouse}
		>
			<div className="moviescard__pic-container">
				<a
					href={movie.trailerLink}
					className="opacity_link moviescard__image-container"
					target="blank"
					rel="noopener noreferrer"
				>
					<img
						alt={movie.nameRU}
						src={
							location.pathname === "/saved-movies"
								? movie.image
								: `https://api.nomoreparties.co${movie.image.url}`
						}
						className="moviescard__img"
					/>
				</a>
				{!isSaved && (isMoused || width < 768) && (
					<button
						onClick={handleSaveClick}
						className={
							location.pathname === "/movies"
								? "moviescard__save-btn"
								: "moviescard__save-btn_off"
						}
					>
						Сохранить
					</button>
				)}

				{isSaved && (
					<button
						className="moviescard__saved-btn"
						onClick={handleDeleteClick}
					></button>
				)}

				{location.pathname === "/saved-movies" && (isMoused || width < 768) && (
					<button
						className="moviescard__delete-btn"
						onClick={handleDeleteClick}
					></button>
				)}
			</div>
			<div className="moviescard__description">
				<p className="moviescard__title">{movie.nameRU}</p>
				<p className="moviescard__timelaps">{calcDuration()}</p>
			</div>
		</div>
	);
}

export default MoviesCard;
