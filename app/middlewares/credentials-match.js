const bcrypt = require('bcrypt');
const { authorizationError, validationError, EMAIL_DOES_NOT_EXIST, WRONG_PASSWORD } = require('../errors');
const { findOne } = require('../services/users');

const credentialsMatch = async (req, _res, next) => {
  try {
    const user = await findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      return match ? next() : next(authorizationError('password schema', WRONG_PASSWORD));
    }
    return next(authorizationError('email schema', EMAIL_DOES_NOT_EXIST));
  } catch {
    return next(validationError('email schema', EMAIL_DOES_NOT_EXIST));
  }
};

module.exports = credentialsMatch;
