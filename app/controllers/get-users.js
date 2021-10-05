const { User } = require('../models');
const logger = require('../logger');

exports.getUsers = async (req, res, next) => {
  const { offset, limit } = req.query;
  try {
    const { rows } = await User.findAndCountAll({
      offset,
      limit
    });
    const users = rows.map(user => user.dataValues);
    res.send(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
