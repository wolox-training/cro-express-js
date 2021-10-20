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
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: 'user' },
      points: { type: DataTypes.INTEGER, defaultValue: 0 },
      position: { type: DataTypes.STRING, defaultValue: 'Developer' }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );
  User.associate = models => {
    User.hasMany(models.Weet, { foreignKey: 'userId' });
    User.hasMany(models.Grade, { foreignKey: 'gradeUserId' });
  };
  return User;
};
