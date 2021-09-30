const { validationResult, checkSchema } = require('express-validator');

exports.schemaValidation = schema => [
  checkSchema(schema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array()[0].msg);
    }
    return next();
  }
];
