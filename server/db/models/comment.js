const Sequelize = require('sequelize')
const sequelize = require('../../tools/db')

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  topic_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'topics',
      key: 'id'
    }
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  content: {
    type: Sequelize.STRING
  },
  create: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Comment