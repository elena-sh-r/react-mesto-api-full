const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const NOT_FOUND_ERROR_TEXT = 'Запрашиваемая карточка не найдена';

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.remove(card)
          .then((ownerCard) => res.send({ data: ownerCard }));
      } else {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const card = req.body;
  card.owner = req.user._id;

  Card.create(card)
    .then((newCard) => res.send({ data: newCard }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};
