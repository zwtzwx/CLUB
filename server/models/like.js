const DB = require('../db/models')

DB.Like.belongsTo(DB.Comment, { foreignKey: 'commentID', sourceKey: 'id' })
exports.addLike = (params) => {
  return DB.Like.create({
    commentID: params.comment_id || 0,
    topicID: params.topic_id || 0,
    userID: params.userID,
    created: new Date()
  })
}

// userID 用户ID commentID 评论ID topicID 话题ID
exports.removeLike = (params, isTopic = 1) => {
  let query = isTopic ? 'topicID' : 'commentID'
  return DB.Like.destroy({
    where: {
      [query]: params.id,
      userID: params.userID
    }
  })
}

// 根据参数获取点赞数  可能是评论点赞数 和 话题点赞数
// 话题点赞 isTopic = 1
exports.getLikes = (id, isTopic = 1) => {
  let query = isTopic ? 'topicID' : 'commentID'
  return DB.Like.findAndCountAll({
    attributes: ['userID'],
    where: {
      [query]: id
    }
  })
}