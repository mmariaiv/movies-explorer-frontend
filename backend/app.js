const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongod://localhost:27017/bitmoviesdb' } =
  process.env;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://mov-e.mmariaiv.nomoredomainsicu.ru'],
    credentials: true,
  })
);

mongoose.connect(DB_ADDRESS, {}).catch((err) => {
  console.log(err, 'Произошла ошибка при попытке подключения к базе данных');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Application is running on port: ${PORT}`);
});
