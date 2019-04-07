'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('post_category', [
      {
      category_name: '推荐',
      category_description: '这是一个推荐描述',
      major_image: 'demo@demo.com',
      },
      {
        category_name: '问答',
        category_description: '这是一个问答描述',
        major_image: 'demo@demo.com',
      },
      {
        category_name: '招聘',
        category_description: '这是一个招聘描述',
        major_image: 'demo@demo.com',
      },
      {
        category_name: '其他',
        category_description: '这是一个其他描述',
        major_image: 'demo@demo.com',
      }, 
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
