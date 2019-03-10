const User  = require('../model/user');
const Token = require('../tools/token');


// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;
  try {
    User.userRegister(userInfo).then(() => {
      res.json({
        msg: '注册成功',
        ret: 1
      })
    });
  } catch (e) {
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
        token
      },
      msg: '登录成功',
      ret: 1
    })
  } catch (error) {
    res.json({
      msg: error.message,
      ret: 0
    })
  }
}