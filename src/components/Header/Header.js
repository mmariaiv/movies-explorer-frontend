import Navigation from "../Navigation/Navigation";
import headerLogo from "../../images/header__logo.svg";

function Header() {
	const isLoggedIn = true;
	const headerPromo = true;
	return (
		<>
			<header className={`header ${headerPromo && "header_promo"}`}>
				<img
					src={headerLogo}
					alt="Логотип дипломного проекта movies-explorer"
					className="logo"
				/>
				<div className="header__info-container">
					<Navigation />
					{isLoggedIn && (
						<div className="header__profile">
							<p className="header__profile-text">Аккаунт</p>
							<div
								className={`header__profile-pic ${
									headerPromo && "header__profile-pic_promo"
								}`}
							></div>
						</div>
					)}
				</div>
			</header>
		</>
	);
}

export default Header;
