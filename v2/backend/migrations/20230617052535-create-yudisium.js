'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Yudisium', {
     
      id_yudisium: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      Koordinator_id_user: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model:'Koordinator',
          key:'id_user'
        }
      },
      nama_yudisium: {
        type: Sequelize.STRING,
        allowNull:false
      },
      tgl_yudisium: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Yudisium');
  }
};