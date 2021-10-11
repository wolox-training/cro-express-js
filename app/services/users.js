const { User } = require('../models');

const findOne = async condition => {
  const user = await User.findOne({ where: condition });
  return user;
};

const findAndCountAll = async (offset, limit) => {
  const { rows } = await User.findAndCountAll({
    offset,
    limit
  });
  return rows.map(user => user.dataValues);
};

const create = async values => {
  const user = await User.create(values);
  return user;
};

module.exports = { findOne, findAndCountAll, create };
