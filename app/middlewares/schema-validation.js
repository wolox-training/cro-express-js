const { body, validationResult, checkSchema } = require('express-validator');
const { User } = require('../../app/models');
const { EMAIL_ALREADY_EXISTS } = require('../errors');
const { validationError, conflictError } = require('../errors');

exports.schemaValidation = schema => [
  checkSchema(schema),
  body('email').custom(async value => {
    const user = await User.findOne({ where: { email: value } });
    if (user) {
      throw new Error(EMAIL_ALREADY_EXISTS);
    }
  }),
  body('password').isStrongPassword(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array()[0].msg;
      return message === EMAIL_ALREADY_EXISTS ? next(conflictError(message)) : next(validationError(message));
    }

    return next();
  }
];
