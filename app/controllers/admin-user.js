const logger = require('../logger');
const upsert = require('../services/upsert');
const hashString = require('../utils/hash-string');

exports.adminUser = async (req, res, next) => {
  try {
    const { name, last_name, email, password, role } = req.body;
    const hashedPassword = hashString(password);
    const user = await upsert(
      { name, lastName: last_name, email, password: hashedPassword, role },
      { email }
    );
    logger.info(user.name);
    const message = role === 'admin' ? 'registered' : 'unregistered';
    res.json(`User ${user.name} was ${message} as administrator`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
