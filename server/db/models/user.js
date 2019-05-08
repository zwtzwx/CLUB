
const Sequelize = require('sequelize');
const sequelize = require('../../tools/db');
// 定义 Model
const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,   // 定义主键
      autoIncrement: true  // 定义自增字段
    },
    name: {
      type: Sequelize.STRING,
      unique: true   // 定义唯一性约束
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    integral: {
      type: Sequelize.INTEGER,
      defaultValue: 0  // 定义默认值
    },
    admin: {
      type: Sequelize.TINYINT,
      defaultValue: 0 
    },
    pic: {
      type: Sequelize.STRING,
    },
    descript: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    login: {
      type: Sequelize.DATE,
      field: 'login_at'
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 1
    }
});

// User.sync({ force: false });
module.exports = User;