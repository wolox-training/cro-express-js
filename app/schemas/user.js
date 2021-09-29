const { NOT_BELONG_COMPANY } = require('../errors');

const signUpSchema = {
  email: {
    matches: {
      errorMessage: NOT_BELONG_COMPANY,
      options: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@wolox+(.co|.com.ar)$/
    }
  }
};

module.exports = { signUpSchema };
