import Navigation from "../Navigation/Navigation";
import headerLogo from "../../images/header__logo.svg";
import { useLocation, useParams, Link } from "react-router-dom";
import React from "react";

function Header() {
	const splat = useParams();
	const location = useLocation();
	const isLoggedIn = true;

	function toggleGreeting() {
		if (location.pathname === "/signin") {
			return "Рады видеть!";
		} else {
			return "Добро пожаловать!";
		}
	}

	React.useEffect(() => {
		console.log(splat);
		console.log(location);
	});

	return (
		<>
			{location.pathname === "/signup" || location.pathname === "/signin" ? (
				<header className="header_auth">
					<img
						className="logo"
						src={headerLogo}
						alt="Логотип дипломного проекта movies-explorer"
					/>
					<h1 className="header__title">{toggleGreeting()}</h1>
				</header>
			) : (
				<header
					className={`header ${location.pathname === "/" && "header_promo"} ${
						location.pathname === "/404" && "header_off"
					}`}
				>
					<img
						src={headerLogo}
						alt="Логотип дипломного проекта movies-explorer"
						className="logo"
					/>
					<div className="header__info-container">
						<Navigation />
						{isLoggedIn && (
							<Link to="/profile" className="header__profile opacity_link">
								<p className="header__profile-text">Аккаунт</p>
								<div
									className={`header__profile-pic ${
										location.pathname === "/" && "header__profile-pic_promo"
									}`}
								></div>
							</Link>
						)}
					</div>
				</header>
			)}
		</>
	);
}

export default Header;
