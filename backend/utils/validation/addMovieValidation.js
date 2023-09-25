const { celebrate, Joi } = require('celebrate');
const { regexLinkValidation } = require('../constants');

module.exports.addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().min(1).required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexLinkValidation),
    trailerLink: Joi.string().required().pattern(regexLinkValidation),
    thumbnail: Joi.string().required().pattern(regexLinkValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
