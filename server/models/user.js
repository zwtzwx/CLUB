const Sequelize = require('sequelize');
const sequelize = require('../tools/db');
const Crypto = require('../tools/crypto');
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
  integray: {
    type: Sequelize.INTEGER,
    field: 'user_integral',
    defaultValue: 0  // 定义默认值
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false 
  },
  pic: {
    type: Sequelize.STRING,
    field: 'user_pic'
  },
  descirpt: {
    type: Sequelize.STRING
  }
}, {freezeTableName: true});

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
  let [password] = Crypto.rsaDecrypt(userInfo.password);
  password = Crypto.hmacEncrypt(password);
  console.log(password);
  return User.create({
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
  let result = await User.findOne({
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
    if (loginPasswd !== result.dataValues.password) {
      throw new Error('密码不正确');
    }
    return result.dataValues;
  } else {
    throw new Error('用户名不正确');
  }
}

/**
 * 根据提供的 键值获取数据
 * key 键
 * value 值
 */
const findUser = (key, value) => {
  return User.findOne({ where: { [key]: value } });
}

exports.findUser = findUser;