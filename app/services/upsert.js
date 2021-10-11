const { findOne, create } = require('./users');

const upsert = async (values, condition) => {
  const user = await findOne(condition);

  return user ? user.update({ role: values.role }) : create(values);
};

module.exports = upsert;
