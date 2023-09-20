import React from "react";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
	const [toggledButtons, setToggledButtons] = React.useState(false);
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();
	const currentUser = React.useContext(CurrentUserContext);

	function handleToggleButtons() {
		setToggledButtons(!toggledButtons);
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateUser({
			email: values.email,
			name: values.name,
		});

		if (props.isChanged) {
			setToggledButtons(false);
		}
		// setToggledButtons(false);
	}

	function handleSignOut() {
		props.onSignOut();
	}

	React.useEffect(() => {
		values.name = currentUser.userName;
		values.email = currentUser.userEmail;
		resetForm();
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
								<label className="edit-profile__label" for="name-input">
									Имя
								</label>
								<input
									name="name"
									id="name-input"
									className="edit-profile__input edit-profile_type_name"
									placeholder={currentUser.userName}
									disabled={!toggledButtons}
									minLength="2"
									maxLength="20"
									onChange={handleChange}
									defaultValue={currentUser.userName}
								/>
							</div>

							<hr className="border_light" />

							<div className="edit-profile__input-container">
								<label className="edit-profile__label" for="email-input">
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

						<span className="edit-profile__input-error name-input-error email-input-error">
							{errors.name ? `Имя: ${errors.name}` : errors?.email}
							{props.currentError && `${props.currentError}`}
						</span>

						<button
							disabled={!isValid}
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
