const nodeMailer = require('nodemailer');
const config = require('../config');
const ejs = require('ejs');
const path = require('path');
const Mail = require('../tools/mail');


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

// 发送注册邮件
exports.registerMail = async(req, res) => {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  config.mailOption.to = mail;
  try {
    // 渲染邮箱模板
    let str = await renderEmail(baseURL, mail, 'signup');
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
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: '邮件发送失败',
      ret: 0
    });
  }
}

// 发送忘记邮件
exports.forgetMail = async(req, res) => {
  let mail = req.body.mail;
  let baseURL = req.headers.origin;
  config.mailOption.to = mail;
  try {
    // 渲染邮箱模板
    let str = await renderEmail(baseURL, mail, 'forget');
    config.mailOption.subject = '忘记密码';
    config.mailOption.html = str;
    // 发送邮箱
    mailTransport.sendMail(config.mailOption, (err, info) => {
      if (err) {
        console.log(err)
      } else {
          res.json({
            msg: '邮件发送成功，请进入你的邮箱查看',
            ret: 1
          });
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: '邮件发送失败',
      ret: 0
    });
  }
}



// 渲染邮件模板
const renderEmail = function (baseURL, mail, url) {
  // 根据当前时间戳加密
  let code = Mail.aseEncrypt(Date.now().toString(), config.appKey);
  let mailPah = url === 'signup' ? 'registermail' : 'forgetmail'
  return new Promise((resolve, reject) => {
    ejs.renderFile(path.resolve(__dirname, `../view/${mailPah}.ejs`), {
      url: `${baseURL}/#/${url}?code=${code}&email=${mail}`
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

