import React from "react";

function SearchForm(props) {
	const [movie, setMovie] = React.useState("");
	const [isMounted, setIsMounted] = React.useState(false);
	const [toggleSwitch, setToggleSwitch] = React.useState(false);

	function handleMovieChange(event) {
		setMovie(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	function handleCheckboxClick() {
		setToggleSwitch(!toggleSwitch);
	}

	React.useEffect(() => {
		const storage = JSON.parse(
			localStorage.getItem("searchResult" + props.formFor)
		);
		if (storage && props.formFor === "Movies") {
			setMovie(storage.movie);
			setToggleSwitch(storage.toggleSwitch);
		}

		setIsMounted(true);
	}, []);

	React.useEffect(() => {
		if (!isMounted) {
			return;
		}

		localStorage.setItem(
			"searchResult" + props.formFor,
			JSON.stringify({ movie: movie, toggleSwitch: toggleSwitch })
		);
		props.updateFlag(true);
	}, [movie]);

	React.useEffect(() => {
		const storage = JSON.parse(
			localStorage.getItem("searchResult" + props.formFor)
		);

		localStorage.setItem(
			"searchResult" + props.formFor,
			JSON.stringify({
				movie: storage?.movie ?? "",
				toggleSwitch: toggleSwitch,
			})
		);
		props.updateFlag(true);
	}, [toggleSwitch]);

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
								// required={props.formFor !== "SavedMovies"}
								onChange={handleMovieChange}
								maxLength={120}
								value={movie}
								placeholder="Фильм"
							/>

							{/* {props.formFor !== "SavedMovies" && currentError && (
								<span className="search__input-error movie-input-error">
									{currentError}
								</span>
							)} */}
						</label>
						{/* <button
							className="search__submit-btn opacity_button"
							type="submit"
							// disabled={props.formFor !== "SavedMovies" && movie.length < 1}
						>
							Найти
						</button> */}
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
