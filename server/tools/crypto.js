// 利用私钥解密
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../config/config');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem'));

// rsa 私钥解密
exports.rsaDecrypt = (keys) => {
    let buf = Buffer.from(keys, 'base64');
    let decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buf);

    return decrypted.toString('utf-8').split('@');
}

// 加盐算法加密
exports.hmacEncrypt = (data) => {
    let hmac = crypto.createHmac('sha1', config.appKey);
    hmac.update(data);
    return hmac.digest('hex');
}
