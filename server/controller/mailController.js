const nodeMailer = require('nodemailer');
const config = require('../config');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto');

// 邮件传输方式
const mailTransport = nodeMailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  port: 465,
  auth: {
    user: '18774671721@163.com',
    pass: 'zwx384500364'
  }
});
const sendEmail = require('../service/sendMail');
const Mail = require('../tools/mail');

// 发送邮件
exports.sendMail = async(req, res) => {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  config.mailOption.to = mail;
  try {
    // 渲染邮箱模板
    let str = await renderEmail(baseURL, mail);
    config.mailOption.html = str;
    // 发送邮箱
    mailTransport.sendMail(config.mailOption, (err, info) => {
      if (err) {
        console.log(err)
      } else {
          res.json({
            msg: '邮件发送成功，请验证你的邮箱',
            ret: 1
          });
      }
    })
    // Mail.sendEmail(mailOption).then(() => {
    //   res.json({
    //     msg: '邮件发送成功，请验证你的邮箱',
    //     ret: 1
    //   });
    // });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: '邮件发送失败',
      ret: 0
    });
  }
}

// sendEmail = function (mail) {
//   return new Promise((resolve, reject) => {
//     config.mailTransport.sendMail(mail, (err, info) => {
//       if (err) {
//         reject();
//       }
//       resolve();
//     })
//   });
// }

// 渲染邮件模板
const renderEmail = function (baseURL, mail) {
  // 根据当前时间戳加密
  let code = aseEncrypt(Date.now().toString(), config.appKey);
  return new Promise((resolve, reject) => {
    ejs.renderFile(path.resolve(__dirname, '../view/email.ejs'), {
      url: `${baseURL}/#/signup?code=${code}&email=${mail}`
    }, (err, str) => {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        resolve(str);
      }
    });
  })
} 

// 对称加密
function aseEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);

  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// 对称解密
function aseDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  // console.log(encrypted);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}