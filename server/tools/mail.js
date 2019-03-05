const nodeMailer = require('nodemailer');

// 创建传输方式
const mailTransport = nodeMailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  port: 465,
  auth: {
    user: '18774671721.163.com',
    pass: 'zwx384500364'
  }
});

module.exports = (mail) => {
  mailTransport.sendMail(mail, (err,info) => {
    if (err) {
      return console.log(error);
    }
    console.log('mail send: ', info.response);
    
  })
}
