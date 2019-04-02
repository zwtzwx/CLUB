const User  = require('../models/user');
const Token = require('../tools/token');
const Mail = require('../tools/mail');
const config = require('../config/config');


// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;
  try {
    // 先验证邮箱是否合法
    Mail.vertifyCode(userInfo.code);
    User.userRegister(userInfo).then(() => {
      res.json({
        msg: '注册成功',
        ret: 1
      })
    }).catch(err => {
      res.json({
        msg: err.message,
        ret: 0
      })
    })
  } catch (e) {
    console.log(e);
    res.json({
      msg: e.message,
      ret: 0
    })
  }
}

exports.login = async (req, res) => {
  // `name@password` 形式的密文
  let userKey = req.body.userKey;
  try {
    let info = await User.userLogin(userKey);
    delete info.password;
    // 生成 token
    let token = Token.generatorToken(info);
    res.json({
      data: {
        token,
        info
      },
      msg: '登录成功',
      ret: 1
    })
  } catch (error) {
    console.log(error);
    
    res.json({
      msg: error.message,
      ret: 0
    })
  }
}

exports.getUserInfo = (req, res) => {
  console.log(req);
  
}