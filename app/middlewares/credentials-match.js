const bcrypt = require('bcrypt');
const { authorizationError, validationError, EMAIL_DOES_NOT_EXIST, WRONG_PASSWORD } = require('../errors');
const { User } = require('../models');

const credentialsMatch = async (req, _res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
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
