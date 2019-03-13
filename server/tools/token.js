const jwt = require('jsonwebtoken');
const RSA = require('./getRSA');
// 生成 Token
exports.generatorToken = (tokenObj) => {
    let token = jwt.sign(tokenObj, RSA.privateKey, {
        expiresIn: 60 * 60 * 2
    });
    
    // 验证一下 token
    jwt.verify(token, RSA.publicKey, (err, decoded) => {
        if (err) {
            console.log('Error', err.message);
        }else {
            console.log(decoded);
        }
    })
    return token;
}

