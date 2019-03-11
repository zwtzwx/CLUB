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
exports.sendMail = function(req, res) {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  console.log('测试路径');
  try {
    sendEmail.sendMail(mail, baseURL, res);
    
    res.json({ret: 1, msg: '邮件发送成功，请验证你的邮箱'});
  } catch (error) {
    console.log('失败：' + error);
    res.json({ret: 0, msg: '', data: error});
  }

}