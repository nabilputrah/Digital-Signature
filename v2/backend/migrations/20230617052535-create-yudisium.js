'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Yudisium', {
     
      id_yudisium: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_yudisium: {
        type: Sequelize.STRING,
        allowNull:false
      },
      tgl_yudisium: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Yudisium');
  }
};