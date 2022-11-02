'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const teacherModel = require("./Teacher")
const subjectModel = require("./Subject")
const classModel = require("../models/class")
const admissionModel = require("./Admission")
const studentModel = require("./Student")
const userModel = require("./user")

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const Teacher = teacherModel(sequelize, Sequelize)
const Subject = subjectModel(sequelize, Sequelize)
const Class = classModel(sequelize, Sequelize)
const Admission = admissionModel(sequelize, Sequelize)
const Student = studentModel(sequelize, Sequelize)
const User = userModel(sequelize, Sequelize)


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = {
  db,
  Teacher,
  Subject,
  Class,
  Admission,
  Student,
  User
};