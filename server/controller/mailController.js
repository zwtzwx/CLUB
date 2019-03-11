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
exports.sendMail = async function(req, res) {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  console.log('测试路径');
  try {
    let result = await sendEmail.sendMail(mail, baseURL, res);    // 此处必须加 await，否则取不到返回值，但是加了 await，函数就必须加 async，否则会报错。此处还可以用Promise 的 .then方法获取
    console.log('成功' + result);
    res.json({ret: 1, msg: '邮件发送成功，请验证你的邮箱'});
  } catch (error) {
    console.log('失败：' + error);
    res.json({ret: 0, msg: '', data: error});
  }

}