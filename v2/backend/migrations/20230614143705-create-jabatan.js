'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jabatan', {
      id_jabatan: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_jabatan: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Dosen_id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:'Dosen',
          key:'id_user'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull:true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jabatan');
  }
};