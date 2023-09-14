import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navigation(props) {
	const isLoggedIn = true;
	const location = useLocation();

	return (
		<>
			{isLoggedIn ? (
				<>
					<div
						className={`nav-list ${props.burgerMenu && "nav-list_burger-menu"}`}
					>
						{props.burgerMenu && (
							<NavLink
								to="/"
								className={`nav-list__item opacity_link ${
									location.pathname === "/" && "nav-list__item_active"
								}`}
							>
								Главная
							</NavLink>
						)}
						<NavLink
							to="/movies"
							className={`nav-list__item opacity_link ${
								location.pathname === "/movies" && "nav-list__item_active"
							}`}
						>
							Фильмы
						</NavLink>
						<NavLink
							to="/saved-movies"
							className={`nav-list__item opacity_link ${
								location.pathname === "/saved-movies" && "nav-list__item_active"
							}`}
						>
							Сохраненные фильмы
						</NavLink>
					</div>
				</>
			) : (
				<div className={`nav-list nav-list_unlogged `}>
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
