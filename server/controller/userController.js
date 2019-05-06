const User  = require('../models/user');
const Token = require('../tools/token');
const Mail = require('../tools/mail');
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const config = require('../config')
const hash = crypto.createHash('sha256')

// 用户注册
exports.register = (req, res) => {
  let userInfo = req.body.userInfo;
  try {
    // 先验证邮箱是否合法
    Mail.vertifyCode(userInfo.code);
    User.userRegister(userInfo).then(() => {
      res.json({
        msg: '注册成功',
        ret: 1
      })
    }).catch(err => {
      res.json({
        msg: err.message,
        ret: 0
      })
    })
  } catch (e) {
    console.log(e);
    res.json({
      msg: e.message,
      ret: 0
    })
  }
}

/**
 * 用户登录
 * @param req.body.userKey  'name@#*password' 形式的密文
 */
exports.login = async (req, res) => {
  let userKey = req.body.userKey;
  try {
    let info = await User.userLogin(userKey);
    delete info.password;
    // 生成 token
    let token = Token.generatorToken(info);
    res.json({
      data: {
        token,
        info
      },
      msg: '登录成功',
      ret: 1
    })
  } catch (error) {
    res.json({
      msg: error.message,
      ret: 0
    })
  }
}

/**
 * 获取用户信息
 * @param req.query.id  用户 ID
 */
exports.getUserInfo = async(req, res) => {
  let user = await Token.verifyToken(req.headers.authorization)
  let result = await User.findUser('id', user.id);
  if (result) {
    // 删除密码和管理员标识
    delete result.dataValues.password;
    delete result.dataValues.admin;
    res.json({
      data: result.dataValues,
      ret: 1,
      msg: ''
    });
  } else {

  }
}

/**
 *  修改用户信息
 *  @params
 *  avatar 用户头像地址（半地址）
 *  descript 用户个性签名
 *  id 用户 id
 */
exports.updateUser = (req, res) => {
  const params = req.body
  try {
    User.updateUser(params).then(() => {
      res.json({
        msg: '修改成功!',
        data: '',
        ret: 1
      })
    })
  }catch(err) {
    res.status(500).json({
      msg: '保存失败!',
      data: '',
      ret: 0
    })
  }
}

exports.updatePassword = (req, res) => {
  const params = req.body
  try {
    User.updatePassword(params).then(() => {
      res.json({
        msg: '密码更改成功，请重新登录!',
        data: '',
        ret: 1
      })
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      data: '',
      ret: 0
    })
  }
}

/**
 *  积分排名
 */
exports.TopIntegray = async(req, res) => {
  try {
    let integrayList = await User.getTopIntegray();
    res.json({
      data: integrayList,
      msg: '',
      ret: 1
    })
  }catch (e) {
    res.json({
      msg: e,
      ret: 0
    })
  }
}

/**
 *  头像上传
 */
exports.avatarUpload = (req, res) => {
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        msg: '头像上传失败',
        data: '',
        ret: 0
      })
    }
    let fileName = req.file.filename + req.file.originalname
    fs.writeFile(`${path.resolve(__dirname, '../../public/images/avatars')}/${fileName}`, data, (err) => {
      // 删除文件
      fs.unlinkSync(req.file.path)
      if (err) {
        console.log(err)
        res.status(500).json({
          msg: '头像上传失败',
          data: '',
          ret: 0
        })
      } else {
        res.json({
          msg: '头像上传成功',
          ret: 1,
          data: fileName
        })
      }
    })
  })
}