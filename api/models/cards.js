'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cards.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    done: {
     type: DataTypes.BOOLEAN,
     set(value) {
      this.setDataValue('done', value=false);
    },
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};