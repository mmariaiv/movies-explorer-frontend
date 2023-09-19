import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
	const [movie, setMovie] = React.useState("");
	const [toggleSwitch, setToggleSwitch] = React.useState(false);
	const location = useLocation();

	function handleMovieChange(event) {
		setMovie(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		localStorage.setItem(
			"searchResult",
			JSON.stringify({ movie: movie, toggleSwitch: toggleSwitch })
		);
		props.updateFlag(true);

		// console.log(movie);
	}

	function handleCheckboxClick() {
		setToggleSwitch(!toggleSwitch);
	}

	React.useEffect(() => {
		const storage = JSON.parse(localStorage.getItem("searchResult"));
		if (location.pathname === "/movies") {
			if (storage) {
				setMovie(storage.movie);
				setToggleSwitch(storage.toggleSwitch);
			}
		}
	}, []);

	// React.useEffect(() => {
	// 	if (location.pathname === "/saved-movies") {

	// 	}
	// }, [])

	return (
		<div className="searchform">
			<div className="searchform__search-container">
				<div className="searchform__formfield">
					<div className="searchform__icon"></div>
					<form className="search" onSubmit={handleSubmit}>
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
						<button className="search__submit-btn opacity_button" type="submit">
							Найти
						</button>
					</form>
				</div>

				<div className="searchform__vertical-border"></div>

				<div className="searchform__short-mov-container">
					<label
						className={`toggle-switch ${toggleSwitch && "toggle-switch_on"}`}
						htmlFor="toggle-switch"
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
