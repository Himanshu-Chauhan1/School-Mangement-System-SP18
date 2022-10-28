'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
       id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        trim:true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        trim:true
      },
      joiningDate: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
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
    await queryInterface.dropTable('teachers');
  }
};