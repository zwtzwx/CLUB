const Sequelize = require('sequelize');
const sequelize = require('../tools/db');

// 帖子
const Topic = sequelize.define('topic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {                  // 用户 ID
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    title: {    // 帖子标题
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {   // 帖子内容
        type: Sequelize.TEXT
    },
    recommend: {   // 是否推荐
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, 
    created: {   // 发表时间
        type: Sequelize.DATE
    }
});

