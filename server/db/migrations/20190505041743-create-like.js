'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('likes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      topicID: {
        type: Sequelize.INTEGER,
        field: 'topic_id',
        defaultValue: 0   // 如果这个点赞不属于话题而是评论  则 topic_id = 0
      },
      commentID: {
        type: Sequelize.INTEGER,
        field: 'comment_id',
        defaultValue: 0  // 如果点赞是不属于评论 则 comment_id = 0
      },
      userID: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        field: 'created_at'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('likes')
  }
};
