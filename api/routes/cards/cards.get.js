const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.get('/get', verifyToken, async (req, res) => {
  try {
    const { userId } = req;

    const filter = {
      where: {
        userId,
      },
      raw: true,
      order:
        req.query.chrono === 'true' ? [['createdAt', 'DESC']] : [['createdAt']],
    };

    if (req.query.filter === 'done') filter.where.done = true;
    if (req.query.filter === 'undone') filter.where.done = false;

    const card = await models.Cards.findAll(filter);

    res.json({ cards: card });
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
