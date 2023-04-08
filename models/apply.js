'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Apply.belongsTo(models.User, { foreignKey: 'userId' })
      Apply.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Apply.init({
    item: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    progress: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apply',
    tableName: 'Applies',
    underscored: true
  })
  return Apply
}
