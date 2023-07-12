'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'userName', {
      type: Sequelize.STRING,
      allowNull: false, // Modify as per your requirement
    });
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false, // Modify as per your requirement
    });
    await queryInterface.addColumn('Users', 'isActive', {
      type: Sequelize.BOOLEAN,
      allowNull: false, // Modify as per your requirement
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'userName');
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'isActive');
  }
};
