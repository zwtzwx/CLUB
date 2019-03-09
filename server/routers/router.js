const express = require('express');
const mailControl = require('../controller/mailController');
const userControl = require('../controller/userController');
const router = express.Router();

// 发送邮箱
router.post('/mail/send', mailControl.sendMail);

// 注册
router.post('/user/signup', userControl.register);

// 登录
router.post('/user/signin', userControl.login);

module.exports = router;
