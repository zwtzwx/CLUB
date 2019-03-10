const jwt = require('jsonwebtoken');

const secretKey = 'ls_sqy';
// 生成 Token
exports.generatorToken = (tokenObj) => {
    let token = jwt.sign(tokenObj, secretKey, {
        expiresIn: 60 * 60 * 2
    });
    
    return token;
}

exports.secretKey = secretKey;
