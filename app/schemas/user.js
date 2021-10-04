const { NOT_BELONG_COMPANY, INVALID_PASSWORD } = require('../errors');

const authSchema = {
  email: {
    matches: {
      errorMessage: NOT_BELONG_COMPANY,
      options: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@wolox+(.co|.com.ar)$/
    }
  },
  password: {
    isLength: {
      errorMessage: INVALID_PASSWORD,
      options: { min: 8 }
    }
  }
};

module.exports = { authSchema };
