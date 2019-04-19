'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('sections', [
      {
        id: 1,
        section_name: '分享',
        created_at: new Date()
      },
      {
        id: 2,
        section_name: '问答',
        created_at: new Date()
      },
      {
        id: 3,
        section_name: "招聘",
        created_at: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('sections', null, {});
  }
};
