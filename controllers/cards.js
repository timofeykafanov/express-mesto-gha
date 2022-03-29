const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка на стороне сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};