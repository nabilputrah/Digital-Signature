'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KoTA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KoTA.init({
    id_KoTA: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const kota = await KoTA.findOne({
            where: {
              id_KoTA: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (kota) {
          throw new Error('ID KoTA must be unique');
        }
        }
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const kota = await KoTA.findOne({
             where: {
               id_user: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (kota) {
            throw new Error('id_user must be unique');
          }
        },
      },
    },
    tahun_ajaran: DataTypes.STRING,
    nama_KoTA: DataTypes.STRING,
    jumlah_pembimbing: DataTypes.INTEGER,
    jumlah_penguji: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps:false,
    freezeTableName: true,
    modelName: 'KoTA',
  });
  return KoTA;
};