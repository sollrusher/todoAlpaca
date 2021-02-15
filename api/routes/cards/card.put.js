const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.use(verifyToken)

router.put('/', async (req, res) => {
  try {
    if (!req.body.id) {
      throw new ServerError('Empty fields', 400);
    }

    const { id, title } = req.body;

    const card = await models.Cards.findOne({ where: { id } });
    if (!card) {
      throw new ServerError('Card not found', 404);
    }

    if (title) {
      await models.Cards.update(
        {
          title,
        },
        {
          where: { id },
        },
      );

      const { createdAt, done } = card;

      res.json({ id: id, title: title, createdAt, done });
    } else {
      const { done } = card;

      await models.Cards.update(
        {
          done: !done,
        },
        { where: { id } },
      );
    }
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
