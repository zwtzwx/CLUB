const Sequelize = require('sequelize');
const Crypto = require('../tools/crypto');
const DB = require('../db/models');
const Op = Sequelize.Op;


// 同步数据结构到数据库
// 如果设置 force: true ，那么会先删除数据库已经存在的表，然后在创建新表
// 如果数据库中表已经存在，那么没必要设为 true
// User.sync({ force: false });



/**
 * userInfo 用户信息
 *    code: uuid 验证对应 email 的
 *    email: 用户邮箱
 *    name: 用户名
 *    password: 密码的加密字符串
 */
exports.userRegister = async (userInfo) => {
  // 查看邮箱是否被注册
  let email = await findUser('email', userInfo.email);
  
  if (email) throw new Error('邮箱已被注册');
  // 查看用户名是否已经存在
  let name = await findUser('name', userInfo.name);
  if (name) throw new Error('用户名已存在');

  // 用私钥解密密码，将解密后的密码加盐后存储在数据库
  console.log(userInfo.password)
  let [password] = Crypto.rsaDecrypt(userInfo.password);
  console.log(password);
  password = Crypto.hmacEncrypt(password);
  return DB.User.create({
    name: userInfo.name,
    password: password,
    email: userInfo.email
  });
  
}

/**
 * loginInfo 输入的用户信息
 *    name: 用户名或邮箱
 *    password: 密码
 */
exports.userLogin = async (userKey) => {

  // 解密登陆用户信息
  let [loginName, loginPasswd] = Crypto.rsaDecrypt(userKey);
  // console.log(loginName, loginPasswd)
  let result = await DB.User.findOne({
    where: {
      [Op.or]: [
        { name: loginName },
        { email: loginName } 
      ]
    },
    attributes: ['id', 'name', 'password', 'pic']
  });
  if (result) {
    // 将铭文密码加盐加密与数据库中的密码比对
    loginPasswd = Crypto.hmacEncrypt(loginPasswd);
    console.log(loginPasswd, result.dataValues.password)
    if (loginPasswd !== result.dataValues.password) {
      throw new Error('密码不正确');
    }
    return result.dataValues;
  } else {
    throw new Error('用户名不正确');
  }
}

exports.getTopIntegray = async () => {
  let result = await DB.User.findAll({
    order: [
      ['integral', 'DESC']
    ],
    limit: 10,
    attributes: ['name', 'integral']
  });
  let list = [];
  result.forEach((item) => {
    list.push(item.dataValues);
  }) 
  return list;
}

/**
 * 根据提供的 键值获取数据
 * key 键
 * value 值
 */
const findUser = (key, value) => {
  return DB.User.findOne({ where: { [key]: value } });
}

exports.findUser = findUser;