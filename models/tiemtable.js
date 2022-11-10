'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tiemtable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tiemtable.init({
    className: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    classShift: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
  }, {
    sequelize,
    modelName: 'tiemtable',
  });
  return tiemtable;
};