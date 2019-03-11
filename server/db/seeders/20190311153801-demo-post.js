'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('post', [{
      post_title: 'tom',
      post_content: 'Doe',
      major_image: 'demo@demo.com',
      category_id: 1,
      user_id: 1,
      views: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
