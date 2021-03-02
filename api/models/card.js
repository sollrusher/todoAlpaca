'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Card.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    done: {
     type: DataTypes.BOOLEAN,
     allowNull: false, 
     defaultValue: false,
    },
    userId: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Card;
};