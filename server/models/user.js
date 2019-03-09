const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
const crypto = require('crypto');


// const NodeRSA = require('node-rsa');
const Op = Sequelize.Op;

// 定义 Model
const User = sequelize.define('user_info', {
  id: {
    type: Sequelize.INTEGER,
    field: 'user_id',   // id 映射到数据表中的 user_id 字段
    primaryKey: true,   // 定义主键
    autoIncrement: true  // 定义自增字段
  },
  name: {
    type: Sequelize.STRING,
    field: 'user_name',
    unique: true   // 定义唯一性约束
  },
  password: {
    type: Sequelize.STRING,
    field: 'user_password'
  },
  email: {
    type: Sequelize.STRING,
    field: 'user_email'
  },
  code: {
    type: Sequelize.STRING,
    field: 'user_code'
  },
  integray: {
    type: Sequelize.INTEGER,
    field: 'user_integral',
    defaultValue: 0  // 定义默认值
  }
}, {freezeTableName: true});

// 同步数据结构到数据库
// 如果设置 force: true ，那么会先删除数据库已经存在的表，然后在创建新表
// 如果数据库中表已经存在，那么没必要设为 true
User.sync({ force: false });

/**
 * userInfo 用户信息
 *    code: uuid 验证对应 email 的
 *    email: 用户邮箱
 *    key: `用户名@密码` 的加密字符串
 */
exports.userRegister = async (userInfo, privateKey) => {

  let buf = Buffer.from(userInfo.key.toString(), 'base64');
  // 解密前端发送过来的用户名密码信息
  // let decrypted = crypto.privateDecrypt({
  //   key:privateKey,
  //   padding: crypto.constants.RSA_PKCS1_PADDING
  // }, buf);
  // console.log(decrypted.toString('utf-8'));
  // let [userName, userPassword] = decrypted.toString('utf-8').split('@');
 
  // return findUser(userInfo.username).then(function(result) {
  //   // result 将是找到的第一个条目 || null
  //   if (result) throw new Error('用户名已存在');
  //   return User.create({
  //     name: userInfo.username,
  //     password: userInfo.password,
  //     email: userInfo.email,
  //     code: userInfo.code
  //   })
  // })
  // console.log(decrypted.toString('utf-8'));
  
  // 查看邮箱是否被注册
  let email = await User.findOne({ where: {'email': userInfo.email} });
  if (email) throw new Error('邮箱已被注册');
  // 查看用户名是否已经存在
  let name = await User.findOne({where: {'name': userInfo.username}});
  if (name) throw new Error('用户名已存在');

  console.log('用户数据为：', userInfo);
  return User.create({
    name: userInfo.userName,
    password: userInfo.userPassword,
    email: userInfo.email,
    code: userInfo.code
  });
  
}

/**
 * loginInfo 输入的用户信息
 *    name: 用户名或邮箱
 *    password: 密码
 */
exports.userLogin = (loginInfo) => {
  console.log('登陆用户数据为：', loginInfo);
  console.log('登陆用户邮箱为：', loginInfo.email);
  return User.findOne({
    where: {
      [Op.or]: [
        { name: loginInfo.name },
        { email: loginInfo.email } 
      ]
    },
    attributes: ['id', 'name', 'email', 'password']
  });
}

/**
 * 根据提供的 键值获取数据
 * key 键
 * value 值
 */
const findUser = (key, value) => {
  return User.findOne({ where: { key: value } });
}

exports.findUser = findUser;