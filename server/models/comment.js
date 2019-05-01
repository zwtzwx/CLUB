const Sequelize = require('sequelize')
const DB = require('../db/models')
const userModel = require('./user')
const Op = Sequelize.Op

DB.Comment.belongsTo(DB.Topic, { foreignKey: 'topic_id', sourceKey: 'id' })
DB.Comment.belongsTo(DB.User, { foreignKey: 'user_id', sourceKey: 'id' })

exports.addComment = async (params) => {
  await DB.Comment.create({
    user_id: params.userID,
    topic_id: params.topicID,
    content: params.content,
    create: new Date(),
    parent_id: params.parentID || 0
  })
  // 发表评论后为用户添加 5 积分
  return userModel.updateIntegral(params.userID, 5)
}