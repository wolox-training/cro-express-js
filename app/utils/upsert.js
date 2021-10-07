const { User } = require('../models');

const upsert = async (values, condition) => {
  const user = await User.findOne({ where: condition });

  return user ? user.update({ role: values.role }) : User.create(values);
};

module.exports = upsert;
