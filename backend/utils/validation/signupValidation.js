const { celebrate, Joi } = require('celebrate');
const { regexNameValidation } = require('../constants');

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string()
      .regex(regexNameValidation)
      .required()
      .min(2)
      .max(30),
    password: Joi.string().required().min(8),
  }),
});
