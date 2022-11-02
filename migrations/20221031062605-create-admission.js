'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admissions', {
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
      fatherName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      motherName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      permanentAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      currentAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
        trim:true
      },
      religion: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      enrollDate: {
        type: Sequelize.DATE,
        allowNull: false,
        trim:true
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        trim:true
      },
      isApproved: {
        type: Sequelize.BOOLEAN, 
        allowNull: true, 
        defaultValue: true
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
    await queryInterface.dropTable('Admissions');
  }
};
