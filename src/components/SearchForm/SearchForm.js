import React from "react";

function SearchForm() {
	const [movie, setMovie] = React.useState("");
	const [toggleSwitch, setToggleSwitch] = React.useState(false);

	function handleMovieChange(event) {
		setMovie(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		console.log(movie);
		setMovie("");
	}

	function handleCheckboxClick() {
		setToggleSwitch(!toggleSwitch);
	}

	return (
		<div className="searchform">
			<div className="searchform__search-container">
				<div className="searchform__formfield">
					<div className="searchform__icon"></div>
					<form className="search">
						<label className="search__form-label">
							<input
								name="movie"
								id="movie-input"
								className="search__input"
								type="text"
								required
								onChange={handleMovieChange}
								value={movie}
								placeholder="Фильм"
							/>

							<span className="search__input-error movie-input-error"></span>
						</label>
						<button
							className="search__submit-btn opacity_button"
							type="submit"
							onSubmit={handleSubmit}
						>
							Найти
						</button>
					</form>
				</div>

				<div className="searchform__vertical-border"></div>

				<div className="searchform__short-mov-container">
					<label
						className={`toggle-switch ${toggleSwitch && "toggle-switch_on"}`}
						for="toggle-switch"
					>
						<input
							type="checkbox"
							id="toggle-switch"
							className="toggle-switch__input"
							onClick={handleCheckboxClick}
						/>
					</label>
					<p className="toggle-switch__description">Короткометражки</p>
				</div>
			</div>

			<hr className="border_light border_searchform"></hr>
		</div>
	);
}

export default SearchForm;
