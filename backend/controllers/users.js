const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

const NOT_FOUND_ERROR_TEXT = 'Запрашиваемый пользователь не найден';
const { NODE_ENV, JWT_SECRET } = process.env;

dotenv.config();

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const user = req.body;

  bcrypt.hash(user.password, 10)
    .then((hash) => User.create({ ...user, password: hash })
      .then((newUser) => res.send({ data: newUser }))
      .catch(next));
};

module.exports.patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_ERROR_TEXT);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.patchAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
