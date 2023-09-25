const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ForbiddenAccessError = require('../errors/forbiddenAccessError');

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Передан фильм с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports.removeMovieById = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.movieId).then((movie) => {
    if (!movie) {
      throw new NotFoundError('Фильм с веденным id не найден');
    } else if (userId === movie.owner._id.toString()) {
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ data: 'Фильм успешно удален' }));
    } else {
      throw new ForbiddenAccessError('У вас нет прав на удаление данного фильма');
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передан фильм с некорректным id'));
      } else {
        next(err);
      }
    });
};
