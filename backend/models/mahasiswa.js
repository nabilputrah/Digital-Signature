'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mahasiswa.init({
    NIM: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const mahasiswa = await Mahasiswa.findOne({
            where: {
              NIM: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (mahasiswa) {
          throw new Error('NIM must be unique');
        }
        }
      }
    },
    id_prodi: {
      type: DataTypes.STRING,
      allowNull:false
    },
    id_KoTA: {
      type: DataTypes.STRING,
      
    },
    nama: DataTypes.STRING,
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const mahasiswa = await Mahasiswa.findOne({
             where: {
               email: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (mahasiswa) {
            throw new Error('email must be unique');
          }
        },
      },
    },
    isKetua: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps:false,
    freezeTableName: true,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};