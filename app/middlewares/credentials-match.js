const bcrypt = require('bcrypt');
const { conflictError, databaseError, EMAIL_DOES_NOT_EXIST, WRONG_PASSWORD } = require('../errors');
const { User } = require('../models');

const credentialsMatch = async (req, _res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      return match ? next() : next(conflictError('password schema', WRONG_PASSWORD));
    }
    return next(conflictError('email schema', EMAIL_DOES_NOT_EXIST));
  } catch {
    return next(databaseError('database schema'));
  }
};

module.exports = credentialsMatch;
