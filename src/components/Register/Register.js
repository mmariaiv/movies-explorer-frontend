import { Link } from "react-router-dom";

function Register() {
	return (
		<main className="content">
			<section className="register">
				<form className="auth" name="register">
					<div className="register__form">
						<label className="auth__form-label">
							<p className="auth__input-title">Имя</p>
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
							<p className="auth__input-title">E-mail</p>
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
							<p className="auth__input-title">Пароль</p>
							<input
								className="auth__input auth__input_type_password"
								name="password"
								id="password-input"
								placeholder="Пароль"
								type="password"
								required
							/>
							<span className="auth__input-error password-input-error"></span>
						</label>
					</div>

					<button className="auth__submit-btn opacity_button" type="submit">
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
	);
}

export default Register;
