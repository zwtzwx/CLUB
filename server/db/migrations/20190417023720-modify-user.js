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
        queryInterface.addColumn('users', 'created_at', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.addColumn('users', 'login_at', {
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
          queryInterface.removeColumn('users', 'created_at', { transaction: t }),
          queryInterface.removeColumn('users', 'login_at', { transaction: t })
      ])
    })
  }
};
