'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      login: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', hashSync(value));
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
