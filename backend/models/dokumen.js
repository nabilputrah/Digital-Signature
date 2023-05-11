'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dokumen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dokumen.init({
    id_dokumen: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const dokumen = await Dokumen.findOne({
            where: {
              id_dokumen: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (laporan) {
          throw new Error('ID Dokumen must be unique');
        }
        }
      }
    },
    id_laporan: DataTypes.STRING,
    dokumen_laporan: {
      type: DataTypes.STRING,

      unique: true,
      validate: {
        isUnique: async function (value) {
          const dokumen = await Dokumen.findOne({
             where: {
               dokumen_laporan: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('Dokumen Laporan must be unique');
          }
        },
      },
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tgl_unggah: {
      type: DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'Dokumen',
  });
  return Dokumen;
};