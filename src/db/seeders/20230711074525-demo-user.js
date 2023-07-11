'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Nguyen',
        lastName: 'Vu',
        email: 'nguyenvuh2r@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Long',
        lastName: 'An',
        email: 'longan1@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Gin',
        lastName: 'Pham',
        email: 'ginpham@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John1',
        lastName: 'Doe1',
        email: 'example1@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Nguyen1',
        lastName: 'Vu1',
        email: 'nguyenvuh21r@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Long1',
        lastName: 'An1',
        email: 'longan12@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Gin1',
        lastName: 'Pham1',
        email: 'ginpham2@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
