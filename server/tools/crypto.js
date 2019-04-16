// 利用私钥解密
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../config');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem'));

// rsa 私钥解密
exports.rsaDecrypt = (keys) => {
    let buf = Buffer.from(keys, 'base64');
    let decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buf);
    let str = decrypted.toString('utf-8');
    let index = str.indexOf('@#*');
    if (index === -1) {
        // 注册时，只加密了密码
        return [str]
    }
    return [str.slice(0, index), str.slice(index + 3)];
}

// 加盐算法加密
exports.hmacEncrypt = (data) => {
    let hmac = crypto.createHmac('sha1', config.appKey);
    hmac.update(data);
    return hmac.digest('hex');
}

