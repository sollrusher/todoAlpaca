const express = require('express');
const signJwt = require('../../utils/sign-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.post('/signup', async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) {
      throw new ServerError('Empty fields', 400);
    }
    const { login, password } = req.body;

    const user = await models.User.create({
      login,
      password,
    });
    const { id } = user;
    const token = signJwt(id);
    return res.json({ token });
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
