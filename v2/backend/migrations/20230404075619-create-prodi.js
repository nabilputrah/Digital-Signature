'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prodi', {
      id_prodi: {
        allowNull:false,
        primaryKey:true,
        type: Sequelize.STRING
      },
      nama_prodi: {
        type: Sequelize.STRING,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prodi');
  }
};