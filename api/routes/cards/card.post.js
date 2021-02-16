const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;


router.post('/newcard',verifyToken, async (req, res) => {
  try {
    if (!req.body.title ) {
      throw new ServerError('Empty fields', 400);
    }
    const { title } = req.body;
    const { userId } = req

    const card = await models.Cards.create({
      title,
      done: false,
      userId,
    });
    const { id, createdAt, done } = card;
    return res.json({ cards: { id, title, createdAt, done } });
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
