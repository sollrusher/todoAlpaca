const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.put('/put',body('title', 'Invalid Title').isLength({min:1, max:20}), verifyToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;
    if (!id) throw new ServerError('Empty fields', 400);

    const { userId } = req;
  
    const oldCard = await models.Cards.findOne({ where: { id, userId } });
    if (!oldCard) throw new ServerError('Card not found', 404);

    const card = {...oldCard.dataValues, ...req.body}

    await models.Cards.update(
      card,
      { where: { id, userId } },
    );
      res.send(card)
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
