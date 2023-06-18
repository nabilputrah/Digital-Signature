'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    static associate(models) {
      // define association here
    }
  }

  Mahasiswa.init({
    NIM: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const mahasiswa = await Mahasiswa.findOne({
            where: {
              NIM: value
            },
            attributes: {
              exclude: ['id']
            }
          });
          if (mahasiswa) {
            throw new Error('NIM must be unique');
          }
        }
      }
      
    },
    Prodi_id_prodi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    KoTA_id_user: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const mahasiswa = await Mahasiswa.findOne({
            where: {
              email: value
            },
            attributes: {
              exclude: ['id']
            }
          });
          if (mahasiswa) {
            throw new Error('Email must be unique');
          }
        }
      }
    },
    isKetua: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Mahasiswa',
  });

  return Mahasiswa;
};
