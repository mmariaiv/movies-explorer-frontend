function Portfolio() {
	return (
		<section className="portfolio">
			<h3 className="text_l portfolio__title">Портфолио</h3>
			<div className="portfolio__link-list">
				<div className="portfolio__item">
					<a
						href="https://github.com/mmariaiv/how-to-learn"
						target="blank"
						rel="noopener noreferrer"
						className="portfolio__link"
					>
						Статичный сайт
					</a>
					<div className="portfolio__link-item">↗</div>
				</div>
				<hr className="border border_light" />
				<div className="portfolio__item">
					<a
						href="https://github.com/mmariaiv/how-to-learn"
						target="blank"
						rel="noopener noreferrer"
						className="portfolio__link"
					>
						Адаптивный сайт
					</a>
					<div className="portfolio__link-item">↗</div>
				</div>
				<hr className="border border_light" />
				<div className="portfolio__item">
					<a
						href="https://github.com/mmariaiv/how-to-learn"
						target="blank"
						rel="noopener noreferrer"
						className="portfolio__link"
					>
						Одностраничное приложение
					</a>
					<div className="portfolio__link-item">↗</div>
				</div>
			</div>
		</section>
	);
}

export default Portfolio;
