import Navigation from "../Navigation/Navigation";
import headerLogo from "../../images/header__logo.svg";
import { useLocation, Link } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header(props) {
	const location = useLocation();
	const [isBurgerMenuClicked, setIsBurgerMenuClicked] = React.useState(false);

	function handleBurgerMenuCLick() {
		setIsBurgerMenuClicked(!isBurgerMenuClicked);
	}

	function toggleGreeting() {
		if (location.pathname === "/signin") {
			return "Рады видеть!";
		} else {
			return "Добро пожаловать!";
		}
	}

	return (
		<>
			{location.pathname === "/signup" || location.pathname === "/signin" ? (
				<header className="header_auth">
					<div className="header__container header__container_auth">
						<Link to="/" className="opacity_link">
							<img
								className="logo"
								src={headerLogo}
								alt="Логотип дипломного проекта movies-explorer"
							/>
						</Link>

						<h1 className="header__title">{toggleGreeting()}</h1>
					</div>
				</header>
			) : (
				<header
					className={`header ${location.pathname === "/" && "header_promo"} ${
						location.pathname === "/404" && "header_off"
					}`}
				>
					<div className={`${isBurgerMenuClicked && "header__menu-opacity"}`}>
						<div className="header__container">
							<Link to="/" className="opacity_link">
								<img
									className="logo"
									src={headerLogo}
									alt="Логотип дипломного проекта movies-explorer"
								/>
							</Link>
							<div
								className={`header__info-container ${
									isBurgerMenuClicked && "header__info-container_burger"
								} ${
									location.pathname === "/" &&
									"header__info-container_burger_promo"
								} ${!props.loggedIn && "header__info-container_unauth"}`}
							>
								<Navigation
									burgerMenu={isBurgerMenuClicked}
									loggedIn={props.loggedIn}
								/>
								{props.loggedIn && (
									<Link
										to="/profile"
										className={`header__profile opacity_link ${
											isBurgerMenuClicked && "header__profile_menu"
										}`}
									>
										<p className="header__profile-text">Аккаунт</p>
										<div
											className={`header__profile-pic ${
												location.pathname === "/" && "header__profile-pic_promo"
											}`}
										></div>
									</Link>
								)}
							</div>

							{props.loggedIn && (
								<>
									<button
										className={`header__menu-burger-btn opacity_button header__close-btn_off ${
											isBurgerMenuClicked && "header__close-btn"
										}`}
										onClick={handleBurgerMenuCLick}
									></button>
									<button
										className={`header__menu-burger-btn opacity_button ${
											isBurgerMenuClicked && "header__menu-burger-btn_off"
										}`}
										onClick={handleBurgerMenuCLick}
									>
										<div className="header__menu-item"></div>
										<div className="header__menu-item"></div>
										<div className="header__menu-item"></div>
									</button>
								</>
							)}
						</div>
					</div>
				</header>
			)}
		</>
	);
}

export default Header;
