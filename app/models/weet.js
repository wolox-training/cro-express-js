'use strict';

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      }
    },
    {
      timestamps: false,
      tableName: 'weets'
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Weet.hasMany(models.Grade, { foreignKey: 'weetId' });
  };
  return Weet;
};
