'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mahasiswa', {
      NIM: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      id_prodi: {
        type: Sequelize.STRING,
        references:{
          model:"Prodi",
          key:"id_prodi"
        },
        allowNull:false
      },
      id_KoTA: {
        type: Sequelize.STRING,
        references:{
          model:"KoTA",
          key:"id_KoTA"
        },
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      isKetua: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mahasiswa');
  }
};