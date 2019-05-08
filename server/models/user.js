const Sequelize = require('sequelize');
const Crypto = require('../tools/crypto');
const DB = require('../db/models');
const Op = Sequelize.Op;


// 同步数据结构到数据库
// 如果设置 force: true ，那么会先删除数据库已经存在的表，然后在创建新表
// 如果数据库中表已经存在，那么没必要设为 true
// User.sync({ force: false });

DB.User.hasMany(DB.Topic, {foreignKey: 'user_id', sourceKey: 'id'});
DB.User.hasMany(DB.Comment, { foreignKey: 'user_id', sourceKey: 'id' })
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
    email: userInfo.email,
    created: new Date()
  });
  
}

exports.forgetPassword = async(params) => {
  // 根据邮箱名查找数据
  let user = await findUser('email', params.email)
  if (user && !user.status)  throw new Error('该账号已禁用，请联系管理员')
  if (user) {
    let [password] = Crypto.rsaDecrypt(params.password);
    password = Crypto.hmacEncrypt(password);
    user.update({
      password
    })
  }else {
    throw new Error('该账号不存在')
  }
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
    attributes: ['id', 'name', 'password', 'pic', 'admin', 'status']
  });
  if (result) {
    // 将铭文密码加盐加密与数据库中的密码比对
    loginPasswd = Crypto.hmacEncrypt(loginPasswd);
    console.log(loginPasswd, result.dataValues.password)
    if (loginPasswd !== result.dataValues.password) {
      throw new Error('密码不正确');
    }
    if (!result.status) throw new Error('该账号已被禁用，请联系管理员!!')
    // 更新最后登录时间
    DB.User.update({
      login: new Date(),
    }, {
      where: {
        id: result.dataValues.id
      }
    });
    return result.dataValues;
  } else {
    throw new Error('用户名不正确');
  }
}

// 获取积分排名列表
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

// 添加积分 integral id
exports.updateIntegral = (id, count) =>{
  return DB.User.findById(id).then((user) => {
    return user.increment('integral', { by: count })
  })
  // return DB.User.update({ integral: integral+count }, {
  //   where: {
  //     id
  //   }
  // })
}

// 修改用户信息
exports.updateUser = (params) => {
  return DB.User.update({
    pic: params.avatar,
    descript: params.descript
  },{ 
    where: {
      id: params.id
    }
  })
}

// 修改密码，将新旧密码用私钥解密，加盐后先判断密码是否正确存储到数据库
exports.updatePassword = async(params) => {
  let [oldPasswd] = Crypto.rsaDecrypt(params.old)
  let [newPasswd] = Crypto.rsaDecrypt(params.new)
  oldPasswd = Crypto.hmacEncrypt(oldPasswd)
  newPasswd = Crypto.hmacEncrypt(newPasswd)
  // 先获取数据库中的密码比对，比对成功后再存储新密码
  let user = await DB.User.findById(params.id)
  if (!user) throw new Error('没有当前用户!')
  if (user.password !== oldPasswd) throw new Error('密码错误!')
  return user.update({
    password: newPasswd
  })
}

exports.getUsers = (params) => {
  return DB.User.findAndCountAll({
    limit: params.size,
    offset: (params.page - 1) * params.size,
    where: {
      name: {
        [Op.like]: params.name ? `%${params.name}%` : '%'
      }
    }
  })
}

exports.udpateStatus = async(id) => {
  let user = await DB.User.findById(id, {
    attributes: ['status']
  })
  let status = user.status ? 0 : 1
  return DB.User.update({ status }, { where: { id } })
}
exports.findUser = findUser;