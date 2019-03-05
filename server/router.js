const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./tools/mail');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

let mailOption = {
  // 发件人
  from: 'zwx <18774671721@163.com>',
  // 收件人
  to: '',
  // 主题
  subject: '测试',
  // 邮件内容
  text: '点击激活：xxx'
};



// 发送邮箱
router.post('/mail/send', (req, res) => {
  let mail = req.body.mail;
  if (!mail) {
    res.status(400);
    res.json({
      data: {
        msg: '请输入邮箱'
      }
    })
  }

  mailOption.to = mail;
  sendMail(mailOption);
  
})
router.get('/random/:min/:max', (req, res) => {
  let min = req.params.min;
  let max = req.params.max;
  console.log(min, max);
  
  if (Number.isNaN(min) || Number.isNaN(max)) {
    res.status(400);
    res.json({error: 'Bad Request.'});
    return;
  }
  let result = Math.round((Math.random() * (max - min) + min));
  res.json({ result: result});
});

module.exports = router;
