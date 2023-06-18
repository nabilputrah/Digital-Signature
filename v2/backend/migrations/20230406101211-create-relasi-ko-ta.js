'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Relasi_KoTA', {
      id_relasi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      KoTA_id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:"KoTA",
          key:"id_user"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      Dosen_id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:"Dosen",
          key:"id_user"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      urutan: {
        type: Sequelize.INTEGER,
        
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      img_ttd: {
        type: Sequelize.TEXT
      },
      tgl_ttd: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Relasi_KoTA');
  }
};