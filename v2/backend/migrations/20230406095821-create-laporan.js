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
      KoTA_id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:"KoTA",
          key:"id_user"
        },
        onDelete:"cascade",
        onUpdate:"cascade",
        unique:true
      },
      judul_TA: {
        type: Sequelize.TEXT
      },
  
      dokumen_laporan: {
        type: Sequelize.BLOB,
      },
      dokumen_laporan_final: {
        type: Sequelize.BLOB,
      },
      lembar_pengesahan: {
        type: Sequelize.BLOB,
       
      },
      digital_signature: {
        type: Sequelize.BLOB,
      },
      tgl_disetujui: {
        type: Sequelize.DATE
      },
      tgl_disidangkan: {
        type: Sequelize.DATE
      },
      tgl_unggah: {
        type: Sequelize.DATE
      },
      tgl_finalisasi: {
        type: Sequelize.DATE
      },
   
      private_key: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
      public_key: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laporan');
  }
};