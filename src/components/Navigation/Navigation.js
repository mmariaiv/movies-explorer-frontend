function Navigation() {
	const isLoggedIn = true;
	return (
		<>
			{isLoggedIn ? (
				<div className="nav-list">
					<button className="nav-list__item nav-list__item_movies">
						Фильмы
					</button>
					<button className="nav-list__item">Сохраненные фильмы</button>
				</div>
			) : (
				<div className="nav-list">
					<button className="nav-list__btn">Регистрация</button>
					<button className="nav-list__btn nav-list__btn_signin">Войти</button>
				</div>
			)}
		</>
	);
}

export default Navigation;
