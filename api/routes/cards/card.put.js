const express = require('express');
const validator = require('../../middlewares/validator');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.put('/', validator, verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new ServerError('Empty fields', 400);
  
    const oldCard = await models.Cards.findOne({ where: { id } });
    if (!oldCard) throw new ServerError('Card not found', 404);

    const card = {...oldCard.dataValues, ...req.body}

    await models.Cards.update(
      card,
      { where: { id } },
    );
      res.send(card)
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
