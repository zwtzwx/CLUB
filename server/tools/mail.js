const nodeMailer = require('nodemailer');
const config = require('../config');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto');

// 创建传输方式
const mailTransport = nodeMailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  port: 465,
  auth: {
    user: '18774671721@163.com',
    pass: 'zwx384500364'
  }
});

exports.sendEmail = function (mail) {
  return new Promise((resolve, reject) => {
    mailTransport.sendMail(mail, (err,info) => {
      if (err) {
        reject();
      }
      resolve();
    })
  });
}

// 渲染邮件模板

exports.renderEmail = function (baseURL, mail) {
  // 根据当前时间戳加密
  let code = aseEncrypt(Date.now().toString(), config.appKey);
  return new Promise ((resolve, reject) => {
    ejs.renderFile(path.resolve(__dirname, '../../email.ejs'), {
      url: `${baseURL}/#/signup?code=${code}&email=${mail}`
    }, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  })
} 

// 验证 code 是否合法
exports.vertifyCode = (code) => {
  let decrypted = aseDecrypt(code, config.appKey);
  // 毫秒级的时间戳是13位数字
  if (/^[0-9]{13}$/.test(decrypted)) {
    // 获取当前时间戳，判断邮箱是否过期
    let now = Date.now();
    if ((Number.parseInt(decrypted) + 30 * 60 * 1000) <= now) {
      // 已过期
      throw new Error('邮箱已过期，请重新注册!');
    }
  }
}

// 对称加密
function aseEncrypt (data, key) {
  const cipher = crypto.createCipher('aes192', key);
 
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// 对称解密
function aseDecrypt (encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  console.log(encrypted);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}