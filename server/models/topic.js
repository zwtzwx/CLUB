const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
const DB = require('../db/models');
const Op = Sequelize.Op;



// 发表话题
// topic : {
//     user_id,
//     plate,
//     title,
//     content
// }
exports.topicAdd = (topic) => {
    return DB.Topic.create({
        section_id: Number.parseInt(topic.plate),
        user_id: Number.parseInt(topic.user_id),
        title: topic.title,
        content: topic.content,
        created: new Date()
    })
}

// 获取话题列表
// params = { page, size, plate }
exports.getTopics = (params) => {
    return DB.Topic.findAll({
            attributes: [
                'id',
                'user_id',
                'title',
                'user_name',
                'recommend',
                'comment'
            ],
            include:[
                {
                    model: DB.User,
                    where: {
                        user_id: Sequelize.col('user.user_id')
                    }
                }
            ],
            offset: (params.page - 1) * params.size,
            limit: params.size,
            order: [
                ['created', 'DESC']
            ],
            where: {
                section_id: {
                    [Op.like]: params.plate ? params.plate : '%'
                }
            }
        })
}
