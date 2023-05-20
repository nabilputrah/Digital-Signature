'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Secret_Key', {
      id_secret: {
        allowNull:false,
        primaryKey:true,
        type: Sequelize.STRING
      },
      id_laporan: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:"Laporan",
          key:"id_laporan"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      NIP: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:"Dosen",
          key:"NIP"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      secret_key: {
        type: Sequelize.BLOB,
        allowNull: false,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Secret_Key');
  }
};