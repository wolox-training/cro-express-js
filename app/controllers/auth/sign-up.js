const hashString = require('../../utils/hash-string');
const logger = require('../../logger');
const { create } = require('../../services/users');

exports.signUp = async (req, res, next) => {
  const { name, last_name, email, password } = req.body;
  try {
    const hashedPassword = hashString(password);

    const user = await create(name, last_name, email, hashedPassword);
    logger.info(user.name);
    res.json(`User ${user.name} was registered successfully`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
