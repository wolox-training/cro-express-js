'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: { type: DataTypes.STRING }
    },
    {
      timestamps: false
    }
  );
  return User;
};
