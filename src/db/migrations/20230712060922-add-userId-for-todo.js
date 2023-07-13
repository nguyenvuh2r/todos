'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Modify as per your requirement
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Todos', 'userId');
  }
};
