const ServerError = require('../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

function validator(req, res, next) {
  try {

    if (req.body.title && req.body.title.length > 15) throw new ServerError('Title length must be <15', 400);

    return next();
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
}

module.exports = validator;
