import { NavLink } from "react-router-dom";

function Navigation() {
	const isLoggedIn = true;
	return (
		<>
			{isLoggedIn ? (
				<div className="nav-list">
					<NavLink
						to="/movies"
						className="nav-list__item nav-list__item_movies opacity_link"
					>
						Фильмы
					</NavLink>
					<NavLink to="/saved-movies" className="nav-list__item opacity_link">
						Сохраненные фильмы
					</NavLink>
				</div>
			) : (
				<div className="nav-list">
					<NavLink to="/signup" className="nav-list__btn opacity_link">
						Регистрация
					</NavLink>
					<NavLink
						to="/signin"
						className="nav-list__btn nav-list__btn_signin opacity_link"
					>
						Войти
					</NavLink>
				</div>
			)}
		</>
	);
}

export default Navigation;
