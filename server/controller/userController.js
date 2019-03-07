const User  = require('../model/user');
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

exports.login = (req, res) => {
  let loginInfo = req.body;
  User.userLogin(loginInfo).then((result) => {
    if (result) {
      // console.log(result.dataValues);
      let data = result.dataValues;
      if (data.password !== loginInfo.password) {
        // 密码不正确
        res.json({
          msg: '密码不正确，请检查你的密码！',
          ret: 0
        });
      } else {
        res.json({
          data,
          msg: '登录成功',
          ret: 1
        })
      }
    } else {
      // 用户名或邮箱不正确
      res.json({
        msg: '用户名或邮箱不正确！',
        ret: 0
      })
    }
  })
}