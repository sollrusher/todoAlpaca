'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Cards', 'index', Sequelize.INTEGER)

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Cards', index)

  }
};
