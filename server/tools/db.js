const Sequelize = require('sequelize');
const config = require('../config')

// 建立连接池
module.exports = new Sequelize('club', 'test', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})