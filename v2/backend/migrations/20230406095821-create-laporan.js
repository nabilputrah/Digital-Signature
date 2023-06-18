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
        onUpdate:"cascade",
        unique:true
      },
      judul_TA: {
        type: Sequelize.TEXT
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