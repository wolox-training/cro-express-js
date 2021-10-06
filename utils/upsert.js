const { User } = require('../app/models');

const upsert = async (values, condition) => {
  const user = await User.findOne({ where: condition });

  return user ? user.update({ isAdmin: !!values.isAdmin }) : User.create(values);
};

module.exports = upsert;
