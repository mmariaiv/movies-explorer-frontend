const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      } else {
        res.status(200).send({
          email: user.email, name: user.name, _id: user._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Был передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  if (!req.body.name && !req.body.email) {
    throw new ValidationError('Переданы неккоректные данные в методы обновления профиля пользователя');
  }

  const newData = {};

  if (req.body.name) {
    const { name } = req.body;

    newData.name = name;
  }

  if (req.body.email) {
    const { email } = req.body;

    newData.email = email;
  }

  User.findByIdAndUpdate(req.user._id, newData, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({
        email: user.email, name: user.name, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы неккоректные данные'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы неккоректные данные при смене информации о пользователе'));
      } else if (err.code === 11000) {
        next(new ConflictError('Этот email уже занят'));
      } else {
        next(err);
      }
    });
};
