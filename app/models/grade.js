'use strict';

module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define(
    'Grade',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      gradeUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'grade_user_id'
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'weet_id'
      },
      score: DataTypes.INTEGER,
      allowNull: false
    },
    {
      timestamps: false,
      tableName: 'grades'
    }
  );
  Grade.associate = models => {
    Grade.belongsTo(models.User, {
      foreignKey: 'gradeUserId'
    });
    Grade.belongsTo(models.Weet, {
      foreignKey: 'weetId'
    });
  };
  return Grade;
};
