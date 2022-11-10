'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tiemtables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      classShift: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },
      startTime: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      endTime: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      teacherName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tiemtables');
  }
};