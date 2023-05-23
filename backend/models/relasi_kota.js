'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relasi_KoTA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Relasi_KoTA.init({
      id_relasi: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_KoTA: DataTypes.STRING,
    NIP: DataTypes.STRING,
    role: {
      type: DataTypes.STRING, 
      allowNull:false,
      validate:{
        isIn: {
          args: [['Penguji','Pembimbing','Kaprodi','Kajur']],
          msg: 'Role yang tersedia hanya Penguji,Pembimbing,Kaprodi,Kajur',
        }
      
      }
    },
    urutan: DataTypes.INTEGER,
    status: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
     
    },
    img_ttd: DataTypes.BLOB,
    tgl_ttd: DataTypes.DATE
  }, {
    sequelize,
    freezeTableName:true,
    timestamps:false,
    modelName: 'Relasi_KoTA',
  });
  return Relasi_KoTA;
};