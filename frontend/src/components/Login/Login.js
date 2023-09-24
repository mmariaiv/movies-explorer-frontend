import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { api } from "../../utils/MainApi";

function Login(props) {
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();
	const navigate = useNavigate();
	const [currentError, setCurrentError] = React.useState("");

	function handleSubmit(evt) {
		evt.preventDefault();

		api
			.login(values.email, values.password)
			.then((data) => {
				if (data) {
					props.handleLogin();

					navigate("/movies", { replace: true });
					setCurrentError("");
				}
			})
			.catch((err) => {
				if (err === 401) {
					setCurrentError(" Вы ввели неправильный логин или пароль.");
				} else if (err === 403) {
					setCurrentError(
						"При авторизации произошла ошибка. Токен не передан или передан не в том формате."
					);
				} else if (err === 500) {
					setCurrentError("На сервере произошла ошибка.");
				} else {
					setCurrentError(
						"При авторизации произошла ошибка. Переданный токен некорректен."
					);
				}
				console.log(err, "error in signing in");
			});
	}

	React.useEffect(() => {
		resetForm();
	}, [resetForm]);

	React.useEffect(() => {
		if (props.loggedIn) {
			navigate("/", { replace: true });
		}
	}, [props.loggedIn]);

	return (
		<main className="content">
			<section className="login">
				<form className="auth" name="login" noValidate onSubmit={handleSubmit}>
					<div className="login__form">
						<label className="auth__form-label">
							<p className="auth__input-title">E-mail</p>
							<input
								className="auth__input auth__input_type_name"
								name="email"
								id="email-input"
								placeholder="E-mail"
								minLength="2"
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

					<div className="auth__submit-container">
						{currentError && (
							<span className="auth__input-error backend-input-error">
								{currentError}
							</span>
						)}

						<button
							className="auth__submit-btn opacity_button"
							type="submit"
							disabled={!isValid}
						>
							Войти
						</button>
					</div>
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
