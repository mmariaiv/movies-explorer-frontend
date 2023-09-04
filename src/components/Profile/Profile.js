function Profile() {
	return (
		<section className="profile">
			<h2 className="profile__title">Привет, Виталий!</h2>
			<form className="edit-profile" name="edit-profile">
				<div className="edit-profile__inputs-container">
					<div className="edit-profile__input-container">
						<label className="edit-profile__label" for="name-input">
							Имя
						</label>
						<input
							name="name"
							id="name-input"
							className="edit-profile__input edit-profile_type_name"
							placeholder="Имя"
							value="Виталий"
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
							placeholder="Почта"
							value="pochta@yandex.ru"
						/>
					</div>
				</div>

				{/* <span className="edit-profile__input-error name-input-error email-input-error"></span> */}

				<button
					type="submit"
					className="edit-profile__submit-btn edit-profile__submit-btn_on opacity_button"
				>
					Сохранить
				</button>
			</form>
			<div className="profile__btns profile__btns_off">
				<button className="profile__btn opacity_button">Редактировать</button>
				<button className="profile__btn profile__btn_logout opacity_button">
					Выйти из аккаунта
				</button>
			</div>
		</section>
	);
}

export default Profile;
