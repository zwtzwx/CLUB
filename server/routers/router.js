const express = require('express');
const mailControl = require('../controller/mailController');
const userControl = require('../controller/userController');
const jwt = require('jsonwebtoken');
//const expressJWT = require('express-jwt');
const jwtServe = require('../service/jwt');
const fs = require('fs');

const router = express.Router();

var PrivateKey = fs.readFileSync(__dirname + '/../rsa/rsa_private_key.pem');  //加密token 校验token时要使用

router.use(jwtServe.jwtMid.unless({
    path: [
        {url: '/web/user/signin', methods: ['POST']},
        { url: '/web/user/signup', methods: ['POST']},
        { url: '/web/mail/send', methods: ['POST']},
        { url: '/web/user/reg-email', methods: ['POST']},
        { url: '/web/getToken', methods: ['GET']},
    ]
}));

// 发送测试邮件
router.post('/mail/send', mailControl.sendMail);

// 发送注册邮箱
// router.post('/user/reg-email', userControl.sendMail);

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
        }, PrivateKey, {
            algorithm: 'RS256',
            expiresIn: 60 * 60   // 1h
        })
    })
});

router.get('/getData', function (req, res) {
    console.log('请求的用户数据为：', req.user);
    res.send(req.user)
});

// router.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//       res.status(401).send('invalid token...');
//     }
// });

module.exports = router;
