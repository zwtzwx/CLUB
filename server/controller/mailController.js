const sender = require('../tools/mail');
const uuidv1 = require('uuid/v1');
const ejs = require('ejs');
const path = require('path');
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
  if (!mail) {
    res.status(400);
    res.json({
      msg: '请输入邮箱'
    });
  }
  mailOption.to = mail;
  // 生成随机字符串
  let uuid = uuidv1().replace(/-/g, '');
  ejs.renderFile(path.resolve(__dirname, '../../email.ejs'), {
    url: `${baseURL}/#/signup?code=${uuid}&email=${mail}`
  }, (err, str) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: '发送邮件失败' });
    } else {
      mailOption.html = str;
      sender(mailOption).then(() => {
        res.json({ 
          msg: '邮件发送成功，请验证你的邮箱',
          ret: 1 });
      });
    }
  });
}