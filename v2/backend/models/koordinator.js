'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Koordinator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Koordinator.init({
    id_koor: {
      type: DataTypes.STRING,
   
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const koordinator = await Koordinator.findOne({
            where: {
              id_koor: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (koordinator) {
          throw new Error('ID Koordinator must be unique');
        }
        }
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const koordinator = await Koordinator.findOne({
             where: {
               id_user: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (koordinator) {
            throw new Error('id_user must be unique');
          }
        },
      },
    },
    Prodi_id_prodi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const koordinator = await Koordinator.findOne({
             where: {
               Prodi_id_prodi: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (koordinator) {
            throw new Error('id_prodi must be unique');
          }
        },
      },
    },
    nama_koordinator: DataTypes.STRING,
    tahun_ajaran: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const koordinator = await Koordinator.findOne({
             where: {
               email: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (koordinator) {
            throw new Error('Email must be unique');
          }
        },
      },
    },
  }, {
    sequelize,
     timestamps:false,
    freezeTableName: true,
    modelName: 'Koordinator',
  });
  return Koordinator;
};