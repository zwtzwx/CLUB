const User  = require('../models/user');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem')).toString('utf-8');

const sender = require('../tools/mail');
const uuidv1 = require('uuid/v1');
const ejs = require('ejs');
const sendEmail = require('../service/sendMail');

// 邮件模板
let mailOption = {
  // 发件人
  from: 'zwx <18774671721@163.com>',
  // 收件人
  to: '',
  // 主题
  subject: '测试',
  // 邮件内容
  html: '点击激活：xxx'
};
// 发送邮件
exports.sendMail = (req, res) => {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  console.log('测试路径');
  let con = '';
  sendEmail.sendMail(mail, baseURL, res);
}

// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;
  User.userRegister(userInfo, privateKey);

  res.json({
    msg: '注册成功',
    ret: 1
  })
  // try {
  //   User.userRegister(userInfo).then(() => {
  //     res.json({
  //       msg: '注册成功',
  //       ret: 1
  //     })
  //   });
  // } catch (e) {
  //   res.json({
  //     msg: e.message,
  //     ret: 0
  //   })
  // }
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