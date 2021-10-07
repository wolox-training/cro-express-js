const jwt = require('jsonwebtoken');
const { validationError, INVALID_TOKEN } = require('../errors');

const tokenValidation = (req, _res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.TOKEN_KEY);
    return next();
  } catch (err) {
    return next(validationError('token schema', INVALID_TOKEN));
  }
};

module.exports = tokenValidation;
