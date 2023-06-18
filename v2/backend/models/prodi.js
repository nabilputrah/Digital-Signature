'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prodi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prodi.init({
    id_prodi: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate: {
        async isDuplicatePK(value) {
          const prodi = await Prodi.findOne({
            where: {
              id_prodi: value
            },
            attributes:{
              exclude:['id']
            }
          });
        if (prodi) {
          throw new Error('ID Prodi must be unique');
        }
        }
      }
    },
    nama_prodi: DataTypes.STRING,
  }, {
    sequelize,
    timestamps:false,
    freezeTableName: true,
    modelName: 'Prodi',
  });
  return Prodi;
};