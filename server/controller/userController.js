const User  = require('../models/user');
const TopicModel = require('../models/topic')
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
 *  忘记密码
 */
exports.forget = (req, res) => {
  let userInfo = req.body.userInfo;
  try {
    // 先验证邮箱是否过期
    Mail.vertifyCode(userInfo.code);
    User.forgetPassword(userInfo).then(() => {
      res.json({
        msg: '提交成功',
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
 * 获取用户信息
 * @param req.query.id  用户 ID
 */
exports.getUserInfo = async(req, res) => {
  let query = req.query
  let result
  if (query.name) {
    // 别人或自己的信息（主页）
    result = await User.findUser('name', query.name);
  } else {
    // 自己的
    let user = await Token.verifyToken(req.headers.authorization)
    result = await User.findUser('id', user.id);
  }
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

/**
 *  更改密码
 */
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

exports.getTopicsByUser = async(req, res) => {
  const params = req.query
  params.page = Number(params.page)
  params.size = Number(params.size)
  try {
    // 先根据用户名获取用户 ID
    let user = await User.findUser('name', params.name)
    console.log(user)
    params.id = user.id
    TopicModel.getTopicsByUserID(params).then(result => {
      res.json({
        msg: '',
        ret: 1,
        data: {
          total: result.count,
          topic_list: result.rows,
          currentPage: params.page
        }
      })
    })
  }catch(err) {
    res.status(500).json({
      ret: 0,
      data: '',
      msg: err.messge
    })
  }
}

/**
 *  获取用户列表
 */
exports.getUsers = (req, res) => {
  const params = req.query
  params.page = Number(params.page)
  params.size = Number(params.size)
  try {
    User.getUsers(params).then(result => {
      res.json({
        msg: '',
        ret: 1,
        data: {
          total: result.count,
          data: result.rows,
          currentPage: params.page
        }
      })
    })
  }catch(err) {
    res.status(500).json({
      ret: 0,
      data: 0,
      msg: err.message
    })
  }
}

exports.updateUserStatus = (req, res) => {
  const id = req.params.id
  try {
    User.udpateStatus(id).then(() => {
      res.json({
        msg: '修改成功!',
        ret: 1,
        data: ''
      })
    })
  }catch(err) {
    res.status(500).json({
      ret: 0,
      data: '',
      msg: err.message
    })
  }
}