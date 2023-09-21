class MoviesApi {
	constructor(options) {
		this.options = options;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	getAllMovies() {
		return fetch(this.options.baseUrl + "/beatfilm-movies", {
			headers: this.options.headers,
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				if (data) {
					localStorage.setItem("allMovies", data);
					return data;
				}
			});
	}
}

export const movieApi = new MoviesApi({
	baseUrl: "https://api.nomoreparties.co",
	headers: {
		"Content-Type": "application/json",
	},
});
