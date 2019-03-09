const nodeMailer = require('nodemailer');
const config = require('../config');

// 创建传输方式
const mailTransport = nodeMailer.createTransport({
  host: config.email.host || 'smtp.163.com',
  secure: config.email.secure || true,
  port: config.email.port || 465,
  auth: {
    user: config.email.user || '18774671721@163.com',
    pass: config.email.password || 'zwx384500364'
  }
});

module.exports = function (mail) {
  return new Promise((resolve, reject) => {
    mailTransport.sendMail(mail, (err,info) => {
      if (err) {
        reject();
      }
      resolve();
    })
  });
}
