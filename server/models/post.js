const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
// const postComment = require('./post-comment');

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
  }, {
    freezeTableName: true,

    // 软删除
    paranoid: true,

  });

exports.Post = Post

// Post.hasMany(postComment.CommentModel, {foreignKey: "post_id"})

exports.postIndex = async function (page=1, size=20, category_id=0) {
  issetCategory = function (category_id) {
    if (category_id!=0) {
      return {category_id: category_id}
    }
    return {}
  }

  posts = await Post.findAndCountAll({
    where: issetCategory(category_id),
    offset:(page - 1) * size,
    limit:size,
    order: [
      ["id", "DESC"],
    ],
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  })
  // console.log(posts);
  return posts;
}

exports.postInsert = async function (data) {
  posts = await Post.create({
    post_title: data.post_title,
    post_content: data.post_content,
    major_image: data.major_image,
    category_id: data.category_id,
    user_id: data.user_id,
    views: data.views,
  });
  return posts;
}

exports.findPostById = async function (post_id) {   // 每次浏览帖子浏览数 +1

  post = await Post.findOne({
    where: { id: post_id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  if (post) {
    let view = post.views;
    console.log('views:', view);
    await post.update({
      views: view + 1
    })  
  }
  
  return post;
}

exports.updatePost = async function (post_id, data) {
  postIns = await Post.findByPk(post_id);

  result = await postIns.update({         // 数据库应该添加验证规则，不许添加空字符串、暂时没加
    post_title: data.post_title,
    post_content: data.post_content,
    major_image: data.major_image,
    category_id: data.category_id,
    user_id: data.user_id,
    views: data.views,
  });
  return result;
}

exports.destroyPost = async function (post_id) {

  result = await Post.destroy({
    where: { id: post_id }
  });
  return result;
}