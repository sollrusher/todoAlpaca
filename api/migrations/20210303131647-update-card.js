'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Cards', 'text', Sequelize.STRING)

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Cards', text)

  }
};
