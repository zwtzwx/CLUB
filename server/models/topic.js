const Sequelize = require('sequelize');
const UserModel = require('./user');
const DB = require('../db/models');
const Op = Sequelize.Op;



DB.Topic.belongsTo(DB.Section, {foreignKey: 'section_id', sourceKey: 'id'});
DB.Topic.belongsTo(DB.User, {foreignKey: 'user_id', sourceKey: 'id'});

// 发表话题
// topic : {
//     user_id,
//     plate,
//     title,
//     content
// }
exports.topicAdd = async(topic) => {
    // 插入话题
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
// params = { page, size, plate }
exports.getTopics = (params) => {
    return DB.Topic.findAndCountAll({
            attributes: [
                'id',
                'user_id',
                'title',
                'recommend',
                'comment'
            ],
            include:[
                {
                    model: DB.User,
                    attributes: ['name']
                    // where: {
                    //     user_id: Sequelize.col('user.user_id')
                    // }
                }
            ],
            offset: (params.page - 1) * params.size,
            limit: params.size,
            order: [
                ['created', 'DESC']
            ],
            where: {
                section_id: {
                    [Op.like]: params.plate ? params.section : '%'
                }
            }
        })
}
