class MainApi {
	constructor(options) {
		this.options = options;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(res.status);
		}
		return res.json();
	}

	getUserInfo() {
		return fetch(this.options.baseUrl + "/users/me", {
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	addMovie(item) {
		console.log("addMovie()", item);
		return fetch(this.options.baseUrl + `/movies/`, {
			method: "POST",
			headers: this.options.headers,
			body: JSON.stringify({
				country: item.country,
				director: item.director,
				duration: item.duration,
				year: item.year,
				description: item.description,
				image: `https://api.nomoreparties.co${item.image.url}`,
				trailerLink: item.trailerLink,
				nameRU: item.nameRU,
				nameEN: item.nameEN,
				thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
				movieId: item.id,
				owner: item.owner,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	getMovies() {
		return fetch(this.options.baseUrl + "/movies", {
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deteleMovie(movieID) {
		return fetch(this.options.baseUrl + `/movies/${movieID}`, {
			method: "DELETE",

			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeUserInfo(newUserInfo) {
		return fetch(this.options.baseUrl + "/users/me", {
			method: "PATCH",

			headers: this.options.headers,
			body: JSON.stringify({
				email: newUserInfo.email,
				name: newUserInfo.name,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	register(email, name, password) {
		return fetch(this.options.baseUrl + "/signup", {
			method: "POST",
			headers: this.options.headers,

			body: JSON.stringify({
				email: email,
				name: name,
				password: password,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	login(email, password) {
		return fetch(this.options.baseUrl + "/signin", {
			method: "POST",
			headers: this.options.headers,

			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				if (data.token) {
					localStorage.setItem("jwt", data.token);
					return data;
				}
			});
	}

	getContent(token) {
		const headers = this.options.headers;
		headers["Authorization"] = `Bearer ${token}`;

		return fetch(this.options.baseUrl + "/users/me", {
			method: "GET",
			headers: headers,
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				return data;
			});
	}
}

export const api = new MainApi({
	baseUrl: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});
