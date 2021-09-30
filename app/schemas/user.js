const {
  NOT_BELONG_COMPANY,
  EMAIL_ALREADY_EXISTS,
  INVALID_PASSWORD,
  conflictError,
  validationError
} = require('../errors');
const { User } = require('../../app/models');

const signUpSchema = {
  email: {
    custom: {
      options: async value => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw conflictError(EMAIL_ALREADY_EXISTS);
        }
      }
    },
    matches: {
      errorMessage: validationError(NOT_BELONG_COMPANY),
      options: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@wolox+(.co|.com.ar)$/
    }
  },
  password: {
    isLength: {
      errorMessage: validationError(INVALID_PASSWORD),
      options: { min: 8 }
    }
  }
};

module.exports = { signUpSchema };
