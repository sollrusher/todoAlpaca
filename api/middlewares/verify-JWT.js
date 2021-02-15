const jwt = require('jsonwebtoken');
const ServerError = require('../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

function verifyToken(req, res, next) {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined')
      throw new ServerError('Token missing', 400);

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    return jwt.verify(bearerToken, 'secretjwt', (err, decodec) => {
      if (err) throw new ServerError('Wrong token', 400);
      req.userId = decodec.userId;
      return next();
    });
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
}

module.exports = verifyToken;
