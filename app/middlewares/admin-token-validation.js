const jwt = require('jsonwebtoken');
const { validationError, authorizationError, INVALID_TOKEN, INVALID_ADMIN_TOKEN } = require('../errors');

const adminTokenValidation = (req, _res, next) => {
  jwt.verify(req.headers.authorization, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return next(validationError('token schema', INVALID_TOKEN));
    } else if (decoded.role !== 'admin') {
      return next(authorizationError('token-admin schema', INVALID_ADMIN_TOKEN));
    }

    return next();
  });
};

module.exports = adminTokenValidation;
