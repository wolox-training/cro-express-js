const logger = require('../logger');
const { findAndCountAll } = require('../services/users');

exports.getUsers = async (req, res, next) => {
  const { offset, limit } = req.query;
  try {
    const users = await findAndCountAll(offset, limit);
    res.send(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
