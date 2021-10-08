const { conflictError, EMAIL_ALREADY_EXISTS } = require('../errors');
const { findOne } = require('../services/users');

const emailValidation = async (req, res, next) => {
  const user = await findOne({ email: req.body.email });
  if (user) {
    return next(conflictError('email schema', EMAIL_ALREADY_EXISTS));
  }

  return next();
};

module.exports = emailValidation;
