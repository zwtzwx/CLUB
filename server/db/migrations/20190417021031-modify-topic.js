'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('topics', 'comment_num', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, { transaction: t }),
        queryInterface.addColumn('topics', 'scan_num', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, { transaction: t }),
        queryInterface.addColumn('topics', 'section_id', {
          type: Sequelize.INTEGER,   
          allowNull: false
        }, { transaction: t }),
        queryInterface.addColumn('topics', 'created_at', {
          type: Sequelize.DATE
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('topics', 'scan_num', { transaction: t }),
          queryInterface.removeColumn('topics', 'section_id', { transaction: t }),
          queryInterface.removeColumn('topics', 'comment_num', { transaction: t }),
          queryInterface.removeColumn('topics', 'created_at', { transaction: t })
      ])
    })
  }
};
