const { celebrate, Joi } = require('celebrate');
const { regexNameValidation } = require('../constants');

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string()
      .regex(regexNameValidation)
      .min(2)
      .max(30),
  }).or('email', 'name'),
});
