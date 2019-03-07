const express = require('express');
const bodyParser = require('body-parser');
const mailControl = require('./controller/mailController');
const userControl = require('./controller/userController');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));





// 发送邮箱
router.post('/mail/send', mailControl.sendMail);

// 注册
router.post('/user/signup', userControl.register);

// 登录
router.post('/user/signin', userControl.login);

module.exports = router;
