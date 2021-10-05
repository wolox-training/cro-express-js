const jwt = require('jsonwebtoken');
const { validationError, INVALID_TOKEN } = require('../errors');

const tokenValidation = (req, _res, next) => {
  jwt.verify(req.headers.authorization, process.env.TOKEN_KEY, err => {
    if (err) {
      return next(validationError('token schema', INVALID_TOKEN));
    }
    return next();
  });
};

module.exports = tokenValidation;
