const { validationResult, checkSchema } = require('express-validator');
const { validationError } = require('../errors');

exports.schemaValidation = schema => [
  checkSchema(schema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        validationError(
          'general schema',
          errors.array().map(error => error.msg)
        )
      );
    }
    return next();
  }
];
