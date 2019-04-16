const User  = require('../models/user');
const Token = require('../tools/token');
const Mail = require('../tools/mail');
const config = require('../config');


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

/**
 * 用户登录
 * @param req.body.userKey  'name@#*password' 形式的密文
 */
exports.login = async (req, res) => {
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

/**
 * 获取用户信息
 * @param req.query.id  用户 ID
 */
exports.getUserInfo = async(req, res) => {
  let result = await User.findUser('id', req.query.id);
  if (result) {
    // 删除密码和管理员标识
    delete result.dataValues.password;
    delete result.dataValues.admin;
    res.json({
      data: result.dataValues,
      ret: 1,
      msg: ''
    });
  } else {

  }
}

exports.TopIntegray = async(req, res) => {
  try {
    let integrayList = await User.getTopIntegray();
    res.json({
      data: integrayList,
      msg: '',
      ret: 1
    })
  }catch (e) {
    res.json({
      msg: e,
      ret: 0
    })
  }

}