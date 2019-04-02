'use strict';
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  test.associate = function(models) {
    // associations can be defined here
  };
  return test;
};