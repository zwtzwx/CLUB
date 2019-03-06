const User  = require('../model/user');
// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;
  User.userRegister(userInfo);
}