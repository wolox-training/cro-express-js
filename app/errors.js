const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.NOT_BELONG_COMPANY = 'The email does not belong to the company';

exports.EMAIL_ALREADY_EXISTS = 'There is already a registered user with this email';

exports.INVALID_PASSWORD = 'Invalid password';
