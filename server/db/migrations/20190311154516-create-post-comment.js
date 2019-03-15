'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post_comment', {
      id: {
        type: Sequelize.INTEGER,
        field: 'comment_id',   // id 映射到数据表中的 user_id 字段
        primaryKey: true,   // 定义主键
        autoIncrement: true  // 定义自增字段
      },
      comment_content: {
        type: Sequelize.STRING,
        field: 'comment_content',
      },
      like_num: {
        type: Sequelize.INTEGER,
        field: 'like_num',
        comment: '点赞数'
      },
      post_id: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        comment: '帖子'
      },
      user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        comment: '用户'
      },
      parent_id: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post_comment');
  }
};
