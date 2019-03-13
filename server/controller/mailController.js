const Mail = require('../tools/mail');

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
exports.sendMail = async(req, res) => {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  mailOption.to = mail;
  try {
    let str = await Mail.renderEmail(baseURL, mail);
    mailOption.html = str;
    Mail.sendEmail(mailOption).then(() => {
      res.json({
        msg: '邮件发送成功，请验证你的邮箱',
        ret: 1
      });
    });
  } catch (err) {
    res.status(500).json({
      msg: '邮件发送失败',
      ret: 0
    });
  }
}

// 验证邮箱
