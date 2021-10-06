const { conflictError, EMAIL_ALREADY_EXISTS } = require('../errors');
const { User } = require('../../app/models');

const emailValidation = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return next(conflictError('email schema', EMAIL_ALREADY_EXISTS));
  }

  return next();
};

module.exports = emailValidation;
