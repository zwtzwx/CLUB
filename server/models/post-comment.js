const Sequelize = require('sequelize');
const sequelize = require('../tools/db');

// 帖子评论模型
const Comment = sequelize.define('post_comment', {
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
    user_id: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      comment: '用户'
    },
    parent_id: {
        type: Sequelize.INTEGER,
     
        references: {
          // 这是引用另一个模型
          model: Comment,
     
          // 这是引用模型的列名称
          key: 'comment_id',
     
        },
        defaultValue: 0
    }
  }, {freezeTableName: true});