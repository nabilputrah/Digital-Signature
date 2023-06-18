'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secret_Key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Secret_Key.init({
    id_secret: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const secret_key = await Secret_Key.findOne({
            where: {
              id_secret: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (secret_key) {
          throw new Error('ID Laporan must be unique');
        }
        }
      }
    },
    Laporan_id_laporan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Dosen_id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    secret_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Secret_Key',
  });
  return Secret_Key;
};