const express = require('express');
const { body, validationResult } = require('express-validator');

const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;


router.post('/card', body('title', 'Invalid Title').isLength({min:1, max:20}), verifyToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    
    return res.json(card);
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
