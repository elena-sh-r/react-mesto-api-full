const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');

const VALIDATION_ERROR_CODE = 400;
const CONFLICTING_ERROR_CODE = 409;
const COMMON_ERROR_CODE = 500;

const { PORT = 3000 } = process.env;
const app = express();

const urlValidationMethod = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const getErrorCode = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return VALIDATION_ERROR_CODE;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return CONFLICTING_ERROR_CODE;
  }

  return COMMON_ERROR_CODE;
};

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidationMethod),
  }).unknown(true),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidationMethod),
  }).unknown(true),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = getErrorCode(err), message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === COMMON_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {});
