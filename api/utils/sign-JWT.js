require('dotenv').config();
const jwt = require('jsonwebtoken');

function signJwt(userId) {
  return jwt.sign({ userId }, process.env.secretJwt)
}

module.exports = signJwt;