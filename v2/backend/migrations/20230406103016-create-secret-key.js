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
      Laporan_id_laporan: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:"Laporan",
          key:"id_laporan"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      Dosen_id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"Dosen",
          key:"id_user"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      secret_key: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Secret_Key');
  }
};