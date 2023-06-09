'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Category.hasMany(models.Apply, { foreignKey: 'categoryId' })
      Category.hasMany(models.User, { foreignKey: 'categoryId' })
      // Category.belongsToMany(models.User, { through: 'categoryId', as: 'users' })
    }
  }
  Category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true
  })
  return Category
}
