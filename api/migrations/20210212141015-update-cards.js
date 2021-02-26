'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Cards', 'userId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Cards', userId)

  }
};
