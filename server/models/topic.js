const Sequelize = require('sequelize');
const UserModel = require('./user');
const sequelize = require('../tools/db')
const DB = require('../db/models');
const Op = Sequelize.Op;



DB.Topic.belongsTo(DB.Section, {foreignKey: 'section_id', sourceKey: 'id'});
DB.Topic.belongsTo(DB.User, {foreignKey: 'user_id', sourceKey: 'id'});
DB.Topic.hasMany(DB.Comment, { foreignKey: 'topic_id', sourceKey: 'id' })
DB.Topic.hasMany(DB.Like, { foreignKey: 'topicID', sourceKey: 'id' })
// 发表话题
// topic : {
//     user_id,
//     plate,
//     title,
//     content
// }
exports.topicAdd = async(topic) => {
    await DB.Topic.create({
        section_id: Number.parseInt(topic.plate),
        user_id: Number.parseInt(topic.user_id),
        title: topic.title,
        content: topic.content,
        created: new Date()
    })
    // 发表话题后给用户加 10 积分
    return UserModel.updateIntegral(topic.user_id, 10)
}

// 获取话题列表
// params = { page, size, section }
exports.getTopics = (params) => {
    return DB.Topic.findAndCountAll({
        attributes: [
            'id',
            'user_id',
            'title',
            'recommend',
            'comment',
            'scan',
            'created',
            'like'
        ],
        include:[
            {
                model: DB.User,
                attributes: ['name']
            },
            {
                model: DB.Section,
                attributes: ['id', 'name']
            }
        ],
        offset: (params.page - 1) * params.size,
        limit: params.size,
        order: [
            ['created', 'DESC']
        ],
        where: {
            section_id: {
                [Op.like]: params.section ? params.section : '%'
            },
            title: {
                [Op.like]: params.name ? `%${params.name}%` : '%'
            }
        }
    })
}

// 根据用户ID 获取用户发表的文章
exports.getTopicsByUserID = (params) => {
    return DB.Topic.findAndCountAll({
        attributes: [
            'id',
            'user_id',
            'title',
            'recommend',
            'comment',
            'scan',
            'created'
        ],
        offset: (params.page - 1) * params.size,
        limit: params.size,
        order: [
            ['created', 'DESC']
        ],
        where: {
           user_id: params.id
        }
    })
}

exports.getTopicsByTitle = (params) => {
    return DB.Topic.findAndCountAll({
        attributes: [
            'id',
            'user_id',
            'title',
            'recommend',
            'comment',
            'scan',
            'created'
        ],
        include:[
            {
                model: DB.User,
                attributes: ['name']
            }
        ],
        offset: (params.page - 1) * params.size,
        limit: params.size,
        order: [
            ['created', 'DESC']
        ],
        where: {
            title: {
                [Op.like]: `%${params.query}%`
            }
        }
    })
}

// 详细话题
exports.topcDetails = async(topicID) => {
    // 话题浏览数加一
    await DB.Topic.findById(topicID).then(topic => {
        topic.increment('scan')
    })
    return DB.Topic.findById(topicID, {
        attributes: {
            exclude: ['user_id', 'section_id']
        },
        include: [
            {
                model: DB.User,
                attributes: ['id', 'pic', 'name', 'descript']
            }
        ]
    })
}

// 获取用户回复数最高的 n 篇文章
exports.getTopicsByUser = (params, n) => {
    return DB.Topic.findAll({
        attributes: ['id', 'title', 'comment'],
        where: {
            user_id: params.userID,
            id: {
                [Op.not]: params.topicID
            }
        },
        // group: 'user_id',
        // having: ['user_id=?', userId],
        order: [
            ['comment', 'DESC']
        ],
        limit: n
    })
}

// 删除话题
exports.delTopic = async(topicID) => {
    // 删除话题及其评论
    // return sequelize.transaction(function (t) {
    //     return DB.Topic.findById(topicID, {transaction: t}).then(function (topic) {
    //         const topicID = topic.id
    //         DB.Like.destroy({
    //             where: {
    //                 topicID: topicID
    //             },
    //             transaction: t
    //         }).then(() => {
    //             DB.Comment.destroy({
    //                 where: {
    //                     topic_id: topicID
    //                 },
    //                 transaction: t
    //             })
    //         })
    //         return topic.destroy()
    //     })
    // })
    return sequelize.transaction().then(function (t) {
        DB.Topic.findById(topicID, {transaction: t}).then(function (topic) {
            const topicID = topic.id
            DB.Like.destroy({
                where: {
                    topicID: topicID
                },
                transaction: t
            }).then(() => {
                topic.destroy()
            })
            return DB.Comment.destroy({
                where: {
                    topic_id: topicID
                },
                transaction: t
            })
        }).then(function () {
          return t.commit();
        }).catch(function (err) {
          return t.rollback();
        });
      });
    // await DB.Topic.findById(topicID).then(topic => {
    //     DB.Comment.destroy({
    //         where: {
    //             topic_id: topic.id
    //         }
    //     })
    //     topic.destroy()
    // })
    // return true
}

exports.updateRecommend = async(id) => {
    let topic = await DB.Topic.findById(id, {
        attributes: ['recommend']
    })
    let recommend = topic.recommend ? 0 : 1
    return DB.Topic.update({ recommend }, { where: { id } })
}