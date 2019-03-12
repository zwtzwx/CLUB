const jwt = require('express-jwt');
const jwtS = require('jsonwebtoken');
const fs = require('fs');

var PublicKey = fs.readFileSync(__dirname + '/../rsa/rsa_public_key.pem');  //加密token 校验token时要使用
var PrivateKey = fs.readFileSync(__dirname + '/../rsa/rsa_private_key.pem');  //加密token 校验token时要使用


// 解析 token 的 jwt 实例
exports.jwtMid = jwt({
    secret: PublicKey,
    credentialsRequired: true,          // 此参数如果设置为 false ，则未通过登陆验证的用户也能访问请求
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'zwt') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;   
    }
})

exports.jwtSign = function (userInfo) {

    return jwtS.sign({
        name: userInfo.name,
        email: userInfo.email
    }, PrivateKey, {
        algorithm: 'RS256',
        expiresIn: 60 * 60 *24      // 之前设置的过期时间为 60 s
    });
}