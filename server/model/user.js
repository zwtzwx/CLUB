const Pool = require('../tools/pool');

exports.userRegister = (userInfo) => {
  console.log(userInfo);
  
  Pool.getConnection((err, connection) => {
    if (err) throw err;
    let sql = `INSERT INTO user_info(user_name,user_password,user_email,user_code) values(?, ?, ?, ?)`;
    connection.query(sql, [userInfo.username, userInfo.password, userInfo.email, userInfo.code], (error, result) => {
      connection.release();
      if (error) throw error;
      console.log(result);
      
    })
  })
}