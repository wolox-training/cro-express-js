'use strict';
module.exports = (sequelize, DataTypes) => {
  const grades = sequelize.define('grades', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  grades.associate = function(models) {
    // associations can be defined here
  };
  return grades;
};