const Sequelize = require('sequelize')
const DB = require('../db/models')
const userModel = require('./user')
const Op = Sequelize.Op

DB.Comment.belongsTo(DB.Topic, { foreignKey: 'topic_id', sourceKey: 'id' })
DB.Comment.belongsTo(DB.User, { foreignKey: 'user_id', sourceKey: 'id' })
DB.Comment.hasMany(DB.Like, { foreignKey: 'commentID', sourceKey: 'id' })

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

exports.getComment = (topicID) => {
  return DB.Comment.findAndCountAll({
    attributes: {
      exclude: ['user_id']
    },
    include: [
      {
        model: DB.User,
        attributes: ['id', 'name']
      }
    ],
    order: [
      ['create', 'ASC']
    ],
    where: {
      topic_id: topicID
    }
  })
}

exports.delComment = async (commentID) => {
  let parent = []
  rows = await DB.Comment.findAll({
    attributes: ['id', 'parent_id'],
    where: {
      id: commentID
    }
  })

  for (let index = 0; index < rows.length; index++) {
    const data = rows[index];
    // console.log('取到的id 为', data.id)
    // console.log('取到的父id 为', data.parent_id)
    parent.push(data.id)
    // 此处方法比较原始
    DB.Comment.destroy({
      where: {
        id: data.id
      }
    })
    console.log('数据为：', data)
  }

  while (parent.length != 0) {  // 数组为空的判定
    tempRows = await DB.Comment.findAll({
      attributes: ['id', 'parent_id'],
      where: {
        parent_id: {
          [Op.or]: parent
        }
      }
    })

    parent = []  // 当前循环内的数据的 id 置为下一次查询的父 id

    // 无结果的情况返回的是空数组
    if (tempRows.length != 0) {
      for (let index = 0; index < tempRows.length; index++) {
        const data = tempRows[index];
        // console.log('取到的id 为', data.id)
        // console.log('取到的父id 为', data.parent_id)
        parent.push(data.id)
        // data.destory()  // 保存了当前临时记录 id 为 parent 数组之后，删除当前临时记录  
        DB.Comment.destroy({
          where: {
            id: data.id
          }
        })
      } 
      
    }

    // console.log('查询出来的子评论为', tempRows)
    
  }
  // console.log(rows)
  return true
  
  // 发表评论后为用户添加 5 积分
  // return userModel.updateIntegral(params.userID, 5)
}
