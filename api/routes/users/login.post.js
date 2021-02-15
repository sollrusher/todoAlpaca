const express = require('express');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.post('/login', async (req, res) => {
  try {
    if(!req.body.login || !req.body.password) {
      throw new ServerError('Empty fields', 400);
      }
    const {login, password} = req.body;

    const user = await models.User.findAll({
      where: { login, password },
    });
    res.json({ user });
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
