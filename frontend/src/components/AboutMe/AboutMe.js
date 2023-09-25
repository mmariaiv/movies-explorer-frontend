import resumePhoto from "../../images/resume__photo.jpg";

function AboutMe() {
	function declOfNum(number, words) {
		return words[
			number % 100 > 4 && number % 100 < 20
				? 2
				: [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
		];
	}

	function getCurrentAge() {
		const currentDate = new Date();
		const currentAge = currentDate.getFullYear() - 2003;

		return `${currentAge} ${declOfNum(currentAge, ["год", "года", "лет"])}`;
	}

	return (
		<section className="aboutme" id="aboutme">
			<h3 className="title_m">Студент</h3>
			<hr className="border" />
			<div className="aboutme__resume">
				<div className="aboutme__info">
					<h2 className="title_l aboutme__title">Мария</h2>
					<p className="text_l aboutme__subtitle">
						Фронтенд-разработчик, {getCurrentAge()}
					</p>
					<p className="aboutme__text">
						Живу в&nbsp;Санкт-Петербурге, учусь на&nbsp;факультете ИСиТ
						в&nbsp;СПбГУТ. Мне нравится разбираться в&nbsp;чем-то новом.
						Программирование, а&nbsp;именно Веб-разработка для меня&nbsp;&mdash;
						это как бесконечный ресурс, где всегда можно узнать что-то новое.
						В&nbsp;процессе прохождения курсов я&nbsp;также поняла, как важно
						уметь находить хороших наставников. Я&nbsp;ценю структурированную
						подачу знаний, и&nbsp;всегда стремлюсь изучить сначала теорию,
						прежде чем переходить к&nbsp;практике.
					</p>
					<a
						href="https://github.com/mmariaiv"
						target="blank"
						rel="noopener noreferrer"
						className="aboutme__link_s opacity_link"
					>
						Github
					</a>
				</div>
				<img
					src={resumePhoto}
					alt="Фотография для краткого резюме"
					className="aboutme__photo"
				/>
			</div>
		</section>
	);
}

export default AboutMe;
