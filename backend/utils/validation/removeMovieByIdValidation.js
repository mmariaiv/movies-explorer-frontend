const { celebrate, Joi } = require('celebrate');

module.exports.removeMovieByIdValidation = celebrate({
  params: {
    movieId: Joi.string().required().hex().length(24),
  },
});
