'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      mobile: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        default:"student"
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
    await queryInterface.dropTable('Users');
  }
};