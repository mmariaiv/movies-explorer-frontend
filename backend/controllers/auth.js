const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const ValidationError = require('../errors/validationError');
const UnauthorizedError = require('../errors/unathorizedError');
const ConflictError = require('../errors/conflictError');

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      }).then((user) => {
        if (!user) {
          throw new ValidationError(
            'Переданы некорректные данные в метод создания пользователя',
          );
        }
        res.status(201).send({
          email: user.email,
          name: user.name,
          _id: user._id,
        });
      }).catch((err) => {
        if (err.name === 'ValidationError') {
          next(
            new ValidationError(
              'Переданы некорректные данные в метод создания пользователя',
            ),
          );
        } else if (err.code === 11000) {
          next(new ConflictError('Этот email уже существует'));
        } else {
          next(err);
        }
      });
    }).catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
