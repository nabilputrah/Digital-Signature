'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laporan', {
      id_laporan: {
        allowNull:false,
        primaryKey:true,
        type: Sequelize.STRING
      },
      id_KoTA: {
        type: Sequelize.STRING,
        references:{
          model:"KoTA",
          key:"id_KoTA"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      judul_TA: {
        type: Sequelize.STRING
      },
      dokumen_laporan: {
        type: Sequelize.STRING,
        unique:true
      },
      lembar_pengesahan: {
        type: Sequelize.STRING,
        unique:true
      },
      digital_signature: {
        type: Sequelize.STRING,
        unique: true
      },
      tgl_disetujui: {
        type: Sequelize.DATE
      },
      tgl_disidangkan: {
        type: Sequelize.DATE
      },
      version: {
        type: Sequelize.STRING
      },
      private_key: {
        type: Sequelize.STRING,
        unique: true
      },
      public_key: {
        type: Sequelize.STRING,
        unique: true
      },
      tgl_unggah: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laporan');
  }
};