const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidationMethod = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidationMethod),
  }).unknown(true),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
