'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Yudisium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Yudisium.init({
    id_yudisium: DataTypes.STRING,
    Koordinator_id_user: DataTypes.INTEGER,
    nama_yudisium: DataTypes.STRING,
    tgl_yudisium: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Yudisium',
  });
  return Yudisium;
};