'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dokumen', {
      id_dokumen: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_laporan: {
        type: Sequelize.STRING,
        references: {
          model:"Laporan",
          key:"id_laporan"
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull: false
      },
      dokumen_laporan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tgl_unggah: {
        type: Sequelize.DATE,
        allowNull:false
      },
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dokumen');
  }
};