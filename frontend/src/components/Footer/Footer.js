function Footer() {
	const currentDate = new Date();
	return (
		<footer className="footer">
			<h4 className="footer__title">
				Учебный проект Яндекс.Практикум х BeatFilm.
			</h4>
			<hr className="border border_light" />
			<div className="footer__info">
				<p className="footer__text footer__text_date">
					&#x0040; {currentDate.getFullYear()}
				</p>
				<ul className="footer__links">
					<li className="footer__link">
						<a
							className="footer__text"
							href="https://practicum.yandex.ru"
							target="blank"
							rel="noopener noreferrer"
						>
							Яндекс.Практикум
						</a>
					</li>
					<li className="footer__link">
						<a
							className="footer__text"
							href="https://github.com/mmariaiv"
							target="blank"
							rel="noopener noreferrer"
						>
							Github
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
