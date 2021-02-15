const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

// router.use(verifyToken)

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.get('/', async (req, res) => {
  const chrono = req.query.chrono;
  try {
    if (!req.query.filter) throw new ServerError('Filter was missing', 400);

    switch (req.query.filter) {
      case 'all': {
        const card = await models.Cards.findAll({
          raw: true,
          order: chrono === 'true' ? [['createdAt', 'DESC']] : [['createdAt']],
        });
        res.json({ cards: card });
        break;
      }
      case 'done': {
        const card = await models.Cards.findAll({
          where: { done: true },
          raw: true,
          order: chrono === 'true' ? [['createdAt', 'DESC']] : [['createdAt']],
        });
        res.json({ cards: card });
        break;
      }
      case 'undone': {
        const card = await models.Cards.findAll({
          where: { done: false },
          raw: true,
          order: chrono === 'true' ? [['createdAt', 'DESC']] : [['createdAt']],
        });
        res.json({ cards: card });
        break;
      }

      default: {
        throw new ServerError('Filter is wrong', 400);
      }
    }
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
