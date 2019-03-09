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