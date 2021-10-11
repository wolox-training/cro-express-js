'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'user'
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
