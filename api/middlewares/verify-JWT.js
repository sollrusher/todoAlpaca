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
    const tokenData = jwt.verify(bearerToken, process.env.secretJwt)
    req.userId = tokenData.userId;
    console.log(req.userId) 
    next()
    
  } catch (error) {
    return res.status(401).json(error.message);
  }
}

module.exports = verifyToken;
