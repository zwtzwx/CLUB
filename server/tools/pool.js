const mysql = require('mysql');

// 建立线程池
module.exports = mysql.createPool({
  connectionLimit: 10,
  connectTimeout: 10000,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});