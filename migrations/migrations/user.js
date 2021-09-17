const { Sequelize } = require('sequelize');

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('users', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: { type: Sequelize.STRING }
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('users');
};

module.exports = { up, down };
