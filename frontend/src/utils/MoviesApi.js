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
		const storage = localStorage.getItem("allMovies");
		if (storage) {
			return new Promise(function (resolve, reject) {
				resolve(JSON.parse(storage));
			});
		}

		return fetch(this.options.baseUrl + "/beatfilm-movies", {
			headers: this.options.headers,
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				if (data) {
					localStorage.setItem("allMovies", JSON.stringify(data));
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
