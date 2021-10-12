const { conflictError } = require('../errors');

const paramValidation = param => (req, res, next) => {
  const queryParam = req.query[param];
  if (!queryParam) {
    return next(conflictError('param schema', `The ${param} parameter is required.`));
  }

  return next();
};

module.exports = paramValidation;
