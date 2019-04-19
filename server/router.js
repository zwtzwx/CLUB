const express = require('express');
const bodyParser = require('body-parser');
const mailControl = require('./controller/mailController');
const userControl = require('./controller/userController');
const topicControl = require('./controller/topicController');
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

// 获取积分排行榜
router.get('/client/integray', userControl.TopIntegray);

// 图片上传
router.post('/images/uploading', topicControl.uploadImage);


// 发表话题
router.post('/topic', topicControl.topicAdd);

// 获取话题列表
router.get('/topic', topicControl.getTopicList);
module.exports = router;
