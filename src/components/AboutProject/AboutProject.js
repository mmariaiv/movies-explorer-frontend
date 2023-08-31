function AboutProject() {
	return (
		<>
			<section className="about-project">
				<h2 className="title_m">О проекте</h2>
				<hr className="border"></hr>
				<div className="about-project__info">
					<div className="about-project__info-item">
						<h3 className="title_s">Дипломный проект включал 5 этапов</h3>
						<p className="text_m">
							Составление плана, работу над бэкендом, вёрстку, добавление
							функциональности и финальные доработки.
						</p>
					</div>
					<div className="about-project__info-item">
						<h3 className="title_s">На выполнение диплома ушло 5 недель</h3>
						<p className="text_m">
							У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
							соблюдать, чтобы успешно защититься.
						</p>
					</div>
				</div>

				<div className="about-project__line">
					<div className="about-project__backend-line text_m">1 неделя</div>
					<div className="about-project__frontend-line text_m">4 недели</div>
					<p className="about-project__subline text_m">Back-end</p>
					<p className="about-project__subline text_m">Front-end</p>
				</div>
			</section>
		</>
	);
}

export default AboutProject;
