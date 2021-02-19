const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;


router.delete('/delete',verifyToken , async (req, res) => {
  try {
    if (!req.query.id) {
      throw new ServerError('Empty fields', 400);
    }

    const { id } = req.query;
    const card = await models.Cards.findOne({ where: { id } });
    if (!card) {
      throw new ServerError('Card not found', 404);
    }
    models.Cards.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
