const Sequelize = require('sequelize');
const sequelize = require('../tools/db');

// 帖子
const Topic = sequelize.define('topic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section_id: {              // 分类 ID
        type: Sequelize.INTEGER,   
        allowNull: false
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
    hot: {   // 是否热帖
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, 
    created: {   // 发表时间
        field: 'created_at',
        type: Sequelize.DATE
    },
    comment: {           // 评论数
        field: 'commment_num',
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    scan: {        // 浏览数
        field: 'scan_num',
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

