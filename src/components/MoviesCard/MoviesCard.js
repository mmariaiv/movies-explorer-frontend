import React from "react";
import MoviePic from "../../images/movie_pic.png";
import { useLocation } from "react-router-dom";
import { useResize } from "../../utils/UseResize";

function MoviesCard() {
	const location = useLocation();
	const [isSaveBtnClicked, setIsSaveBtnClicked] = React.useState(false);
	const [isMoused, setIsMoused] = React.useState(false);
	const { width } = useResize();

	function handleSaveClick() {
		setIsSaveBtnClicked(!isSaveBtnClicked);
	}

	function handleMouse() {
		setIsMoused(!isMoused);
	}

	return (
		<div
			className="moviescard"
			onMouseEnter={handleMouse}
			onMouseLeave={handleMouse}
		>
			<div className="moviescard__pic-container">
				<img
					alt="Изображение фильма"
					src={MoviePic}
					className="moviescard__img"
				/>
				{!isSaveBtnClicked && (isMoused || width < 768) && (
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

				{isSaveBtnClicked && (
					<button
						className="moviescard__saved-btn"
						onClick={handleSaveClick}
					></button>
				)}

				{location.pathname === "/saved-movies" && (isMoused || width < 768) && (
					<button className="moviescard__delete-btn"></button>
				)}
			</div>
			<div className="moviescard__description">
				<p className="moviescard__title">Пи Джей Харви: A dog called money</p>
				<p className="moviescard__timelaps">1ч 17м</p>
			</div>
		</div>
	);
}

export default MoviesCard;
