const express = require('express');
const mailControl = require('../controller/mailController');
const userControl = require('../controller/userController');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const router = express.Router();

// var secretOrPrivateKey = "hello  BigManing"  //加密token 校验token时要使用

// router.use(expressJWT({
//     secret: secretOrPrivateKey   
// }).unless({
//     path: ['/web/getToken']
// }));

// 发送测试邮件
router.post('/mail/send', mailControl.sendMail);

// 发送注册邮箱
router.post('/user/reg-email', userControl.sendMail);

// 注册
router.post('/user/signup', userControl.register);

// 登录
router.post('/user/signin', userControl.login);

router.get('/getToken', function (req, res) {
    res.json({
        result: 'ok',
        token: jwt.sign({
            name: "BinMaing",
            data: "============="
        }, secretOrPrivateKey, {
                expiresIn: 60 * 1
            })
    })
});

router.get('/getData', function (req, res) {
    res.send(req.user)
});

module.exports = router;
