const { NOT_BELONG_COMPANY, INVALID_PASSWORD, NOT_NULL } = require('../errors');

const signInSchema = {
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

const signUpSchema = {
  ...signInSchema,
  name: {
    custom: {
      errorMessage: `Name ${NOT_NULL}`,
      options: value => !!value
    }
  },
  last_name: {
    custom: {
      errorMessage: `Last name ${NOT_NULL}`,
      options: value => !!value
    }
  }
};

module.exports = { signUpSchema, signInSchema };
