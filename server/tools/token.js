const jwt = require('jsonwebtoken');
const RSA = require('./getRSA');
// 生成 Token
exports.generatorToken = (tokenObj) => {
    let token = jwt.sign(tokenObj, RSA.privateKey, {
        expiresIn: 60 * 60 * 2,
        algorithm: 'RS256'
    });
    
    // 验证一下 token
    // jwt.verify(token, RSA.publicKey, {algorithms: 'RS256'}, (err, decoded) => {
    //     if (err) {
    //         console.log('Error', err.message);
    //     }else {
    //         console.log(decoded);
    //     }
    // })
    return token;
}

// 验证 token 获取用户信息
exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, RSA.publicKey, { algorithms: 'RS256' }, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}

