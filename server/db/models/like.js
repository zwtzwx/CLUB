const sequelize = require('../../tools/db')
const Sequelize = require('sequelize')

const Like = sequelize.define('like', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topicID: {
    type: Sequelize.INTEGER,
    field: 'topic_id',
    defaultValue: 0
  },
  commentID: {
    type: Sequelize.INTEGER,
    field: 'comment_id',
    defaultValue: 0  // 如果点赞是不属于评论 则 comment_id = 0
  },
  userID: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    field: 'created_at'
  }
})

module.exports = Like