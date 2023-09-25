import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();

	function goBack() {
		navigate(-1);
	}
	return (
		<main className="content">
			<section className="notfound">
				<div className="notfound__container">
					<h1 className="notfound__title">404</h1>
					<p className="notfound__subtitle">Страница не найдена</p>
				</div>

				<button className="notfound__link opacity_link" onClick={goBack}>
					Назад
				</button>
			</section>
		</main>
	);
}

export default NotFound;
