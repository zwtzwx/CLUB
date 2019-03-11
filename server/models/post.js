const Sequelize = require('sequelize');
const sequelize = require('../tools/db');

// 帖子模型
const Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      field: 'post_id',   // id 映射到数据表中的 user_id 字段
      primaryKey: true,   // 定义主键
      autoIncrement: true  // 定义自增字段
    },
    post_title: {
      type: Sequelize.STRING,
      field: 'post_title',
      unique: true   // 定义唯一性约束
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
    }
  }, {freezeTableName: true});