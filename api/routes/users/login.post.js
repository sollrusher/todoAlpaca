const { compare } = require('bcryptjs');
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

    const user = await models.User.findOne({
      where: { login },
    });

    if(!user) throw new ServerError('User with this login not found', 404)
    
    if(!await compare(password, user.password))  throw new ServerError('Password wrong', 406)
    res.json({ id: user.id })

  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
