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
      Prodi_id_prodi: {
        type: Sequelize.STRING,
        references:{
          model:"Prodi",
          key:"id_prodi"
        },
        allowNull:false
      },
      KoTA_id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:"KoTA",
          key:"id_user"
        },
        allowNull:true,
        onDelete:'cascade',
        onUpdate:'cascade'
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
     
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mahasiswa');
  }
};