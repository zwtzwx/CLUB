const sender = require('../tools/mail');
const uuidv1 = require('uuid/v1');
const ejs = require('ejs');
const config = require('../config');

// 邮件模板
let mailOption = {
  // 发件人
  from: config.email.user,
  // 收件人
  to: '',
  // 主题
  subject: '测试',
  // 邮件内容
  html: '点击激活：xxx'
};
// 发送邮件

function sendMail(mail, baseURL, res) {
    if (!mail) {
        res.status(400);
        res.json({
            msg: '请输入邮箱'
        });
    }

    mailOption.to = mail;
    // 生成随机字符串
    let uuid = uuidv1().replace(/-/g, '');

    ejs.renderFile(__dirname + '/../views/email.ejs', {
        url: `${baseURL}/#/signup?code=${uuid}&email=${mail}`
    }, function(err, str) {
        if (err) {
            console.log(err);
            res.json({ret: 0, msg: '', data: err});
        } else {

            mailOption.html = str;
            sender(mailOption).then(function() {
                res.json({ret: 1, msg: '邮件发送成功，请验证你的邮箱'});
            });
        }
    });
}

exports.sendMail = sendMail;

