'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KoTA', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:'User',
          key:'id_user'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        unique:true
      },
      id_KoTA: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      tahun_ajaran: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nama_KoTA: {
        type: Sequelize.STRING,
        allowNull:false
      },
      jumlah_pembimbing: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      jumlah_penguji: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KoTA');
  }
};