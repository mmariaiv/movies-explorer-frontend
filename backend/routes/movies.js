const router = require('express').Router();

const {
  addMovie,
  getMovies,
  removeMovieById,
} = require('../controllers/movies');
const { addMovieValidation } = require('../utils/validation/addMovieValidation');
const { removeMovieByIdValidation } = require('../utils/validation/removeMovieByIdValidation');

router.get('/', getMovies);

router.post('/', addMovieValidation, addMovie);

router.delete('/:movieId', removeMovieByIdValidation, removeMovieById);

module.exports = router;
