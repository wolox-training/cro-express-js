const { User } = require('../../models');
const { checkWoloxEmail, validateEmailExists, validatePassword } = require('../../../utils/validations');
const hashPassword = require('../../../utils/hashPassword');
const { NOT_BELONG_COMPANY, EMAIL_ALREADY_EXISTS, INVALID_PASSWORD } = require('../../errors');
const logger = require('../../logger');

exports.signUp = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    const isEmailValid = checkWoloxEmail(email);
    if (!isEmailValid) {
      return res.status(400).json({ message: NOT_BELONG_COMPANY });
    }

    const emailExists = await validateEmailExists(email);
    if (emailExists) {
      return res.status(422).json({ message: EMAIL_ALREADY_EXISTS });
    }

    const isPasswordValid = await validatePassword(password);
    if (!isPasswordValid) {
      return res.status(422).json({ message: INVALID_PASSWORD });
    }
    const hashedPassword = hashPassword(password);

    const user = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword
    });
    logger.info(user.name);
    return res.json(`User ${user.name} was registered successfully`);
  } catch (error) {
    logger.error(error);
    return res.status(422).json({ error });
  }
};
