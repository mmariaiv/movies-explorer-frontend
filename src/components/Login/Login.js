import { Link } from "react-router-dom";
function Login() {
	return (
		<main className="content">
			<section className="login">
				<form className="auth" name="login">
					<div className="login__form">
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
						Войти
					</button>
				</form>

				<div className="auth__signup">
					<p className="auth__text">Ещё не зарегистрированы?</p>
					<Link
						to="/signup"
						className="auth__text auth__text_type_link opacity_link"
					>
						Регистрация
					</Link>
				</div>
			</section>
		</main>
	);
}

export default Login;
