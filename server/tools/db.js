const Sequelize = require('sequelize');
const config = require('../config')

// 建立连接池
<<<<<<< HEAD
module.exports = new Sequelize('club', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
=======
module.exports = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  operatorsAliases: config.database.operatorsAliases,
>>>>>>> zwt
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