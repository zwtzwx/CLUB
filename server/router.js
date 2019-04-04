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

// 根据用户 ID 获取用户信息
router.get('/user/user-info', userControl.getUserInfo);
module.exports = router;
