function Portfolio() {
	return (
		<section className="portfolio">
			<h3 className="text_l portfolio__title">Портфолио</h3>
			<div className="portfolio__link-list">
				<a
					href="https://github.com/mmariaiv/how-to-learn"
					target="blank"
					rel="noopener noreferrer"
					className="portfolio__item opacity_link"
				>
					<p className="portfolio__link">Статичный сайт</p>
					<div className="portfolio__link-item">↗</div>
				</a>
				<hr className="border border_light border_portfolio" />
				<a
					className="portfolio__item opacity_link"
					href="https://mmariaiv.github.io/russian-travel/"
					target="blank"
					rel="noopener noreferrer"
				>
					<p className="portfolio__link">Адаптивный сайт</p>
					<div className="portfolio__link-item">↗</div>
				</a>
				<hr className="border border_light border_portfolio" />
				<a
					className="portfolio__item opacity_link"
					href="https://m.mmariaiv.nomoreparties.co"
					target="blank"
					rel="noopener noreferrer"
				>
					<p className="portfolio__link">Одностраничное приложение</p>
					<div className="portfolio__link-item">↗</div>
				</a>
			</div>
		</section>
	);
}

export default Portfolio;
