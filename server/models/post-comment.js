const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
const post = require('./post');

// 帖子评论模型
const CommentModel = sequelize.define('post_comment', {
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
      comment: '帖子',
      references: {
        // This is a reference to another model
        model: post.Post,
   
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      comment: '用户'
    },
    parent_id: {
      type: Sequelize.INTEGER,
      field: 'parent_id',
      comment: '父评论',
      defaultValue: 0
    }
  }, {
    freezeTableName: true,

    // 软删除
    paranoid: true,

  });

exports.CommentModel = CommentModel;

exports.commentIndex = async function () {
  comments = await CommentModel.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  return comments;
}

exports.commentInsert = async function (data) {
  comments = await CommentModel.create({
    comment_content: data.comment_content,
    like_num: data.like_num,
    user_id: data.user_id,
    parent_id: data.parent_id
  });
  return comments;
}

exports.findCommentById = async function (comment_id) {
  commentIns = await CommentModel.findOne({
    where: { id: comment_id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  return commentIns;
}

exports.updateComment = async function (comment_id, data) {
  commentIns = await CommentModel.findByPk(comment_id);

  result = await commentIns.update({         // 数据库应该添加验证规则，不许添加空字符串、暂时没加
    comment_content: data.comment_content,
    like_num: data.like_num,
    user_id: data.user_id,
    parent_id: data.parent_id
  });
  return result;
}

exports.destroyComment = async function (comment_id) {

  result = await CommentModel.destroy({
    where: { id: comment_id }
  });
  return result;
}

exports.countComments = async function (post_id) {
  counts = await CommentModel.count({
    where: { post_id: post_id }
  });
  return counts;
}