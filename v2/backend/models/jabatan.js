'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jabatan.init({
    id_jabatan: DataTypes.STRING,
    nama_jabatan: DataTypes.STRING,
    Dosen_id_user: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps:false,
    freezeTableName: true,
    modelName: 'Jabatan',
  });
  return Jabatan;
};