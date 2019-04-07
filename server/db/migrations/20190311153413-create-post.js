'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
      id: {
        type: Sequelize.INTEGER,
        field: 'post_id',   // id 映射到数据表中的 user_id 字段
        primaryKey: true,   // 定义主键
        autoIncrement: true  // 定义自增字段
      },
      post_title: {
        type: Sequelize.STRING,
        field: 'post_title',
        // unique: true   // 定义唯一性约束
      },
      post_content: {
        type: Sequelize.TEXT,
        field: 'post_content',
        comment: '帖子正文'
      },
      major_image: {
        type: Sequelize.STRING,
        field: 'major_image',
        comment: '帖子主图'
      },
      category_id: {
        type: Sequelize.STRING,
        field: 'category_id',
        comment: '关联分类',
        defaultValue: 0  // 定义默认值
      },
      user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        comment: '关联用户',
        defaultValue: 0  // 定义默认值
      },
      views:{
          type: Sequelize.INTEGER,
          field: 'views',
          comment: '浏览数',
          defaultValue: 0  // 定义默认值
      },
      tag:{
        type: Sequelize.STRING,
        field: 'tags',
        comment: '帖子标签',
        defaultValue: 0   // 定义默认值
      },
      is_hot:{
        type: Sequelize.INTEGER,
        field: 'is_hot',
        comment: '是否推荐',
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
    return queryInterface.dropTable('post');
  }
};
