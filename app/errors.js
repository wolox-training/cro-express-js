const internalError = (message, internalCode, errors = null) => ({
  message,
  internalCode,
  errors
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.VALIDATION_ERROR = 'validation_error';
exports.validationError = (message, errors) => internalError(message, exports.VALIDATION_ERROR, errors);

exports.CONFLICT_ERROR = 'conflict_error';
exports.conflictError = (message, errors) => internalError(message, exports.CONFLICT_ERROR, errors);

exports.AUTHORIZATION_ERROR = 'authorization_error';
exports.authorizationError = (message, errors) => internalError(message, exports.AUTHORIZATION_ERROR, errors);

exports.NOT_ACCEPTABLE_ERROR = 'not_acceptable_error';
exports.notAcceptableError = (message, errors) =>
  internalError(message, exports.NOT_ACCEPTABLE_ERROR, errors);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = (message, errors) => internalError(message, exports.NOT_FOUND_ERROR, errors);

exports.NOT_BELONG_COMPANY = 'The email does not belong to the company';
exports.NOT_NULL = 'can not be null';
exports.EMAIL_ALREADY_EXISTS = 'There is already a registered user with this email';
exports.EMAIL_DOES_NOT_EXIST = 'There is not already a registered user with this email';
exports.INVALID_PASSWORD = 'Password should be at least 8 chars long';
exports.WRONG_PASSWORD = 'Wrong password';
exports.INVALID_TOKEN = 'The authorization token is not valid';
exports.INVALID_ADMIN_TOKEN = 'the user is not authenticated as an administrator';
exports.INVALID_ROLE = 'Role should be user or admin';
exports.LENGTH_WEET = 'The weet is too long';
exports.NOT_WEET = 'It was not possible to get a weet';
