import React from "react";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
	const [toggledButtons, setToggledButtons] = React.useState(false);
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();
	const [currentError, setCurrentError] = React.useState("");
	const [successProfileSaved, setSuccessProfileSaved] = React.useState(false);
	const currentUser = React.useContext(CurrentUserContext);

	function handleToggleButtons() {
		setToggledButtons(!toggledButtons);
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		props
			.onUpdateUser({
				email: values.email,
				name: values.name,
			})
			.then(() => {
				setSuccessProfileSaved(true);
				setTimeout(() => {
					setSuccessProfileSaved(false);
				}, 5000);

				setToggledButtons(false);
			})
			.catch((err) => {
				console.log(err);
				if (err === 500) {
					setCurrentError("На сервере произошла ошибка.");
				} else if (err === 409) {
					setCurrentError("Пользователь с таким email уже существует.");
				} else if (err === 400) {
					setCurrentError(
						"Поле name содержит только латиницу, кириллицу, пробел или дефис."
					);
				} else {
					setCurrentError("При обновлении профиля произошла ошибка.");
				}
				setToggledButtons(true);
			});
	}

	function handleSignOut() {
		props.onSignOut();
	}

	React.useEffect(() => {
		values.name = currentUser.userName;
		values.email = currentUser.userEmail;
		resetForm();
		setCurrentError("");
	}, [resetForm, currentUser]);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__edit-container">
					<h2 className="profile__title">Привет, {currentUser.userName}</h2>
					<form
						className="edit-profile"
						name="edit-profile"
						onSubmit={handleSubmit}
						noValidate
					>
						<div className="edit-profile__inputs-container">
							<div className="edit-profile__input-container">
								<label className="edit-profile__label" htmlFor="name-input">
									Имя
								</label>
								<input
									name="name"
									id="name-input"
									className="edit-profile__input edit-profile_type_name"
									placeholder={currentUser.userName}
									disabled={!toggledButtons}
									minLength="2"
									maxLength="30"
									onChange={handleChange}
									defaultValue={currentUser.userName}
								/>
							</div>

							<hr className="border_light" />

							<div className="edit-profile__input-container">
								<label className="edit-profile__label" htmlFor="email-input">
									Почта
								</label>
								<input
									name="email"
									id="email-input"
									className="edit-profile__input edit-profile_type_email"
									placeholder={currentUser.userEmail}
									disabled={!toggledButtons}
									onChange={handleChange}
									defaultValue={currentUser.userEmail}
								/>
							</div>
						</div>

						<span
							className={
								"edit-profile__input-error name-input-error email-input-error"
							}
						>
							{successProfileSaved && "Профиль успешно сохранен!"}
							{errors.name ? errors.name : errors?.email}
							{currentError && `${currentError}`}
						</span>

						<button
							disabled={
								!isValid ||
								((!values.email || values.email === currentUser.userEmail) &&
									(!values.name || values.name === currentUser.userName))
							}
							type="submit"
							className={`edit-profile__submit-btn opacity_button ${
								toggledButtons && "edit-profile__submit-btn_on"
							}`}
						>
							Сохранить
						</button>
					</form>
				</div>
				<div
					className={`profile__btns ${toggledButtons && "profile__btns_off"}`}
				>
					<button
						className="profile__btn opacity_button"
						onClick={handleToggleButtons}
					>
						Редактировать
					</button>
					<button
						className="profile__btn profile__btn_logout opacity_button"
						onClick={handleSignOut}
					>
						Выйти из аккаунта
					</button>
				</div>
			</section>
		</main>
	);
}

export default Profile;
