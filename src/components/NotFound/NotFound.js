import { Link } from "react-router-dom";

function NotFound() {
	return (
		<main className="content">
			<section className="notfound">
				<div className="notfound__container">
					<h1 className="notfound__title">404</h1>
					<p className="notfound__subtitle">Страница не найдена</p>
				</div>

				<Link className="notfound__link opacity_link" to="/">
					Назад
				</Link>
			</section>
		</main>
	);
}

export default NotFound;
