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
    KoTA_id_user: {
      type: DataTypes.INTEGER,
    
      unique: true,
      validate: {
        isUnique: async function (value) {
          const laporan = await Laporan.findOne({
             where: {
              KoTA_id_user: value 
              },
              attributes: {
                exclude:['id']
              } 
            });
          if (laporan) {
            throw new Error('id KoTA must be unique');
          }
        },
      },
    },
    judul_TA: DataTypes.BLOB,
    lembar_pengesahan: DataTypes.BLOB,
    dokumen_laporan: DataTypes.BLOB,
    dokumen_laporan_final: DataTypes.BLOB,

    digital_signature: {
      type: DataTypes.BLOB,
    },
    tgl_disetujui: DataTypes.DATE,
    tgl_disidangkan: DataTypes.DATE,
    tgl_unggah: DataTypes.DATE,
    tgl_finalisasi: DataTypes.DATE,
    // version: DataTypes.STRING,
    private_key: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
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
    // tgl_unggah: DataTypes.DATE
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'Laporan',
  });
  return Laporan;
};