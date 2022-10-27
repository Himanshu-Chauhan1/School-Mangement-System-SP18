'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  classes.init({
    className: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classShift: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'class',
  });
  return classes;
};