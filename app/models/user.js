'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );
  return User;
};
