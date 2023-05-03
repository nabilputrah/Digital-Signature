'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Laporan.init({
    id_laporan: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const laporan = await Laporan.findOne({
            where: {
              id_laporan: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (laporan) {
          throw new Error('ID Laporan must be unique');
        }
        }
      }
    },
    id_KoTA: DataTypes.STRING,
    judul_TA: DataTypes.STRING,
    dokumen_laporan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
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
    lembar_pengesahan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
             where: {
               lembar_pengesahan: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('Lembar Pengesahan must be unique');
          }
        },
      },
    },
    digital_signature: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
             where: {
               digital_signature: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('Digital Signature must be unique');
          }
        },
      },
    },
    tgl_disetujui: DataTypes.DATE,
    tgl_disidangkan: DataTypes.DATE,
    version: DataTypes.STRING,
    private_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
             where: {
               private_key: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('Private Key must be unique');
          }
        },
      },
    },
   public_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
             where: {
              public_key: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('Public Key must be unique');
          }
        },
      },
    },
    tgl_unggah: DataTypes.DATE
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'Laporan',
  });
  return Laporan;
};