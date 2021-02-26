const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.get('/user', verifyToken , async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.userId },
    });
    const { login } = user;
    res.json({ login, id: req.userId });
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
