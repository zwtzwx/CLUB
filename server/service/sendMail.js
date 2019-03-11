const sender = require('../tools/mail');
const ejs = require('ejs');
const config = require('../config');
const crypto = require('crypto');

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

async function sendMail(mail, baseURL, res) {
    if (!mail) {
        res.status(400);
        res.json({
            msg: '请输入邮箱'
        });
    }

    mailOption.to = mail;
    
    // 采用当前时间戳加密之后作为注册邮件的签名，请求时验证数据，设定超时时间。
    let buf = Date.now().toString();

    let encrypted = Encrypt(buf, config.appKey);

    return new Promise(function (resolve, reject) {                 // 构造 promise 对象
        console.log('构造 promise 对象 的日志');

        ejs.renderFile(__dirname + '/../views/email.ejs', {
            url: `${baseURL}/#/signup?code=${encrypted}&email=${mail}`
        }, function(err, str) {
            if (err) {
                console.log(err);
                reject(err);
                // res.json({ret: 0, msg: '', data: err});
            } else {
    
                mailOption.html = str;
                sender(mailOption).then(function() {
                    resolve('ok');
                    // res.json({ret: 1, msg: '邮件发送成功，请验证你的邮箱'});
                });
            }
        });
    })

}

// 简单加密解密

let Encrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

exports.Decrypt = (encrypted, key) => {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

exports.sendMail = sendMail;

