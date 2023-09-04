import { Link } from "react-router-dom";
import headerLogo from "../../images/header__logo.svg";

function Register() {
	return (
		<>
			<header className="header_auth">
				<img
					className="logo"
					src={headerLogo}
					alt="Логотип дипломного проекта movies-explorer"
				/>
				<h2 className="header__title">Добро пожаловать!</h2>
			</header>
			<main className="content">
				<section className="register">
					<form className="auth" name="register">
						<div className="register__form">
							<label className="auth__form-label">
								<input
									className="auth__input auth__input_type_name"
									name="name"
									id="name-input"
									placeholder="Имя"
									type="text"
									required
									value="Виталий"
								/>
								<span className="auth__input-error name-input-error"></span>
							</label>
							<label className="auth__form-label">
								<input
									className="auth__input auth__input_type_email"
									name="email"
									id="email-input"
									placeholder="Почта"
									type="email"
									required
									value="pochta@yandex.ru"
								/>
								<span className="auth__input-error email-input-error"></span>
							</label>
							<label className="auth__form-label">
								<input
									className="auth__input auth__input_type_email"
									name="password"
									id="password-input"
									placeholder="Пароль"
									type="password"
									required
								/>
								<span className="auth__input-error password-input-error"></span>
							</label>
						</div>

						<button className="auth__submit-btn" type="submit">
							Зарегистрироваться
						</button>
					</form>

					<div className="auth__signup">
						<p className="auth__text">Уже зарегистрированы?</p>
						<Link
							to="/signin"
							className="auth__text auth__text_type_link opacity_link"
						>
							Войти
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}

export default Register;
