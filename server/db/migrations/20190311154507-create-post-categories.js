'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post_category', {
      id: {
        type: Sequelize.INTEGER,
        field: 'category_id',   // id 映射到数据表中的 user_id 字段
        primaryKey: true,   // 定义主键
        autoIncrement: true  // 定义自增字段
      },
      category_name: {
        type: Sequelize.STRING,
        field: 'category_name',
        unique: true   // 定义唯一性约束
      },
      category_description: {
        type: Sequelize.STRING,
        field: 'category_description',
        comment: '分类描述'
      },
      major_image: {
        type: Sequelize.STRING,
        field: 'major_image',
        comment: '分类主图'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post_category');
  }
};
