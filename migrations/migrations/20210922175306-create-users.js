'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: { type: Sequelize.STRING, allowNull: false }
    }),
  down: queryInterface => queryInterface.dropTable('users')
};
