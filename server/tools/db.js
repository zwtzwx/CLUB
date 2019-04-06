const Sequelize = require('sequelize');
const config = require('../config')

// 建立连接池
module.exports = new Sequelize('club', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: config.database.define || true
  },
  pool: {
    max: config.database.poolMax,
    min: config.database.poolMin,
    acquire: config.database.poolAcquire,
    idle: config.database.PoolIdle
  }
})