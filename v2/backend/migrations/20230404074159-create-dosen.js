'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dosen', {
     
      id_user: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model:'User',
          key:'id_user'
        },
        unique:true,
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull:false
      },
      NIP: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      nama: {
        allowNull:false,
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
    await queryInterface.dropTable('Dosen');
  }
};