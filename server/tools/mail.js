const config = require('../config');
const crypto = require('crypto');
// 验证邮箱
// 验证 code 是否合法
exports.vertifyCode = (code) => {
  let decrypted = aseDecrypt(code, config.appKey);
  // 毫秒级的时间戳是13位数字
  if (/^[0-9]{13}$/.test(decrypted)) {
    // 获取当前时间戳，判断邮箱是否过期
    let now = Date.now();
    if ((Number.parseInt(decrypted) + 30 * 60 * 1000) <= now) {
      // 已过期
      throw new Error('邮箱已过期，请重新注册!');
    }
  }
}

// 对称加密
function aseEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);

  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// 对称解密
function aseDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  // console.log(encrypted);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}



