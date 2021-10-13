'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      grade_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'users' },
          key: 'id'
        }
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'weets' },
          key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.addColumn('users', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });

    await queryInterface.addColumn('users', 'position', {
      type: Sequelize.STRING,
      defaultValue: 'Developer'
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('grades');
    await queryInterface.removeColumn('users', 'points');
    await queryInterface.removeColumn('users', 'position');
  }
};
