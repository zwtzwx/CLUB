const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
// const postComment = require('./post-comment');

// 帖子模型
const Favorite = sequelize.define('favorite', {
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
  }, {
    freezeTableName: true,

    // 软删除
    paranoid: true,

  });

exports.Favorite = Favorite

// Post.hasMany(postComment.CommentModel, {foreignKey: "post_id"})

exports.favoriteIndex = async function (page=1, size=10, favorite_type=1) {

  favorites = await Favorite.findAndCountAll({
    where: { favorite_type: favorite_type },
    offset:(page - 1) * size,
    limit:size,
    order: [
      ["id", "DESC"],
    ],
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  })
  // console.log(posts);
  return favorites;
}

exports.favoriteInsert = async function (data) {
  favorite = await Favorite.create({
    favorites_id: data.favorites_id,
    favorites_type: data.favorites_type,
    user_id: data.user_id,
  });
  return favorite;
}

exports.findfavoriteById = async function (favorite_id) {  

    favorite = await Favorite.findOne({
    where: { id: favorite_id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  
  return favorite;
}

exports.updateFavorite = async function (favorite_id, data) {
  favoriteIns = await Favorite.findByPk(favorite_id);

  result = await favoriteIns.update({         // 数据库应该添加验证规则，不许添加空字符串、暂时没加
    favorites_id: data.favorites_id,
    favorites_type: data.favorites_type,
    user_id: data.user_id,
  });
  return result;
}

exports.destroyFavorite = async function (favorite_id) {

  result = await Favorite.destroy({
    where: { id: favorite_id }
  });
  return result;
}