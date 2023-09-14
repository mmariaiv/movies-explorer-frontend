import React from "react";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { Link } from "react-router-dom";

function Register() {
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
			<section className="register">
				<form
					className="auth"
					name="register"
					noValidate
					onSubmit={handleSubmit}
				>
					<div className="register__form">
						<label className="auth__form-label">
							<p className="auth__input-title">Имя</p>
							<input
								className="auth__input auth__input_type_name"
								name="name"
								id="name-input"
								placeholder="Имя"
								type="text"
								minLength="2"
								maxLength="20"
								required
								onChange={handleChange}
							/>
							<span className="auth__input-error name-input-error">
								{errors?.name}
							</span>
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
								onChange={handleChange}
							/>
							<span className="auth__input-error email-input-error">
								{errors?.email}
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
								{errors?.password}
							</span>
						</label>
					</div>

					<button
						className="auth__submit-btn opacity_button"
						type="submit"
						disabled={!isValid}
					>
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
