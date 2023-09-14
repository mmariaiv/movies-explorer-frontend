import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";

function Login() {
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();

	function handleSubmit(evt) {
		evt.preventDefault();

		console.log(isValid, values);
	}

	React.useEffect(() => {
		resetForm();
	}, [resetForm]);

	return (
		<main className="content">
			<section className="login">
				<form className="auth" name="login" noValidate onSubmit={handleSubmit}>
					<div className="login__form">
						<label className="auth__form-label">
							<p className="auth__input-title">Имя</p>
							<input
								className="auth__input auth__input_type_name"
								name="name"
								id="name-input"
								placeholder="Имя"
								minLength="2"
								maxLength="20"
								type="text"
								required
								onChange={handleChange}
							/>
							<span className="auth__input-error name-input-error">
								{errors.name}
							</span>
						</label>
						<label className="auth__form-label">
							<p className="auth__input-title">Пароль</p>
							<input
								className="auth__input auth__input_type_password"
								name="password"
								id="password-input"
								placeholder="Пароль"
								type="password"
								minLength="8"
								required
								onChange={handleChange}
							/>
							<span className="auth__input-error password-input-error">
								{errors.password}
							</span>
						</label>
					</div>

					<button
						className="auth__submit-btn opacity_button"
						type="submit"
						disabled={!isValid}
					>
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
