'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('post', [
      {
        post_title: '人工智能',
        post_content: 'Doe',
        major_image: 'demo@demo.com',
        category_id: 1,
        user_id: 1,
        views: 1,
        tags: '人工智能',
        is_hot: 1,
      },
      {
        post_title: 'python',
        post_content: 'Doe',
        major_image: 'demo@demo.com',
        category_id: 1,
        user_id: 1,
        views: 1,
        tags: 'python',
        is_hot: 0,
      },
      {
        post_title: 'golang',
        post_content: 'Doe',
        major_image: 'demo@demo.com',
        category_id: 1,
        user_id: 1,
        views: 1,
        tags: 'golang',
        is_hot: 0,
      },
      {
        post_title: '算法',
        post_content: 'Doe',
        major_image: 'demo@demo.com',
        category_id: 1,
        user_id: 1,
        views: 1,
        tags: '算法',
        is_hot: 1,
      },
      {
        post_title: '问答',
        post_content: 'Doe',
        major_image: 'demo@demo.com',
        category_id: 1,
        user_id: 1,
        views: 1,
        tags: '问答',
        is_hot: 1,
      }
    ], {});
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
