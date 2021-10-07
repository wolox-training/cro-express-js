const logger = require('../logger');
const upsert = require('../utils/upsert');
const hashString = require('../utils/hash-string');

exports.adminUser = async (req, res, next) => {
  try {
    const { name, last_name, email, password, is_admin } = req.body;
    const hashedPassword = hashString(password);
    const user = await upsert(
      { name, lastName: last_name, email, password: hashedPassword, isAdmin: is_admin },
      { email }
    );
    logger.info(user.name);
    const message = is_admin ? 'registered' : 'unregistered';
    res.json(`User ${user.name} was ${message} as administrator`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
