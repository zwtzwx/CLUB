// 利用私钥解密
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem'));

module.exports = (keys) => {

    let buf = Buffer.from(keys, 'base64');
    let decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buf);

    return decrypted.toString('utf-8').split('@');
}

