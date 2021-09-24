const { User } = require('../app/models');

const validateEmailExists = async value => {
  const user = await User.findOne({ where: { email: value } });
  if (user) {
    return true;
  }
  return false;
};

const checkWoloxEmail = value => value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@wolox+(.co|.com.ar)$/);

const validatePassword = value => Promise.resolve(value.length >= 8);

module.exports = { validateEmailExists, checkWoloxEmail, validatePassword };
