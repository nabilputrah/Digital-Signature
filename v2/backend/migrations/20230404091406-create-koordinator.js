'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Koordinator', {
      id_user: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model:'User',
          key:'id_user'
        },
        unique:true,
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      id_koor: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      Prodi_id_prodi: {
        type: Sequelize.STRING,
        references:{
          model:'Prodi',
          key:'id_prodi'
        },
        unique:true,
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      nama_koordinator: {
        type: Sequelize.STRING
      },
      tahun_ajaran: {
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Koordinator');
  }
};