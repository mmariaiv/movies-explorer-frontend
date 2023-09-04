import MoviePic from "../../images/movie_pic.png";

function MoviesCard() {
	return (
		<div className="moviescard">
			<div className="moviescard__pic-container">
				<img
					alt="Изображение фильма"
					src={MoviePic}
					className="moviescard__img"
				/>
				<button className="moviescard__save-btn moviescard__save-btn_off">
					Сохранить
				</button>
				<button className="moviescard__saved-btn moviescard__saved-btn_off"></button>
			</div>
			<div className="moviescard__description">
				<p className="moviescard__title">Пи Джей Харви: A dog called money</p>
				<p className="moviescard__timelaps">1ч 17м</p>
			</div>
		</div>
	);
}

export default MoviesCard;
