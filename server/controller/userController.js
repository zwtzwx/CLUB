const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const ejs = require('ejs');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem')).toString('utf-8');
const User  = require('../models/user');
const sender = require('../tools/mail');
const sendEmail = require('../service/sendMail');
const jwtService = require('../service/jwt');


// 发送注册邮件
exports.sendMail = function(req, res) {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  sendEmail.sendMail(mail, baseURL, res);
}

// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;

  User.userRegister(userInfo, privateKey).then(function(success) {
    res.json({
      msg: '注册成功',
      ret: 1
    })
  }, function (fail) {
    res.json({
      msg: '注册失败',
      ret: 0
    })
  });

}

// 登陆
exports.login = (req, res) => {
  let loginInfo = req.body.loginInfo;
  console.log('传入的用户数据为：', loginInfo);
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
        console.log(result.dataValues);

        sign = jwtService.jwtSign(data);
        console.log('签名为：', sign);
        res.json({
          sign,
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