'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorite', {
      id: {
        type: Sequelize.INTEGER,
        field: 'favorite_id',   // id 映射到数据表中的 user_id 字段
        primaryKey: true,   // 定义主键
        autoIncrement: true  // 定义自增字段
      },
      favorites_id: {
        type: Sequelize.STRING,
        field: 'favorites_id',
        comment: '收藏 id',
      },
      favorites_type: {
        type: Sequelize.TEXT,
        field: 'favorites_type',
        comment: '收藏类型 1，帖子。2，用户。3.评论',
        defaultValue: 1,  // 定义默认值
      },
      user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        comment: '关联用户',
        defaultValue: 0  // 定义默认值
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
    return queryInterface.dropTable('favorite');
  }
};
