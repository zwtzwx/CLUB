const LikeModel = require('../models/like')
const Token = require('../tools/token')
/**
 *  点赞
 *  comment_id  评论 id 如果不是评论点赞可不必传
 *  topic_id   话题 id 如果不是话题点赞可不必传
 */
exports.addLike = async(req, res) => {
  const params = req.body
  let token = req.headers.authorization
  try {
    // 先验证 token 获取用户信息 id
    let user = await Token.verifyToken(token)
    params.userID = user.id
    LikeModel.addLike(params).then(() => {
      res.json({
        msg: '点赞成功!',
        data: '',
        ret: 1
      })
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0,
      data: ''
    })
  }
}

exports.removeLike = async(req, res) => {
  const params = req.query
  params.id = params.comment_id ? params.comment_id : params.topic_id
  let token = req.headers.authorization
  try {
    // 先验证 token 获取用户信息 id
    let user = await Token.verifyToken(token)
    params.userID = user.id
    LikeModel.removeLike(params, 0).then(() => {
      res.json({
        msg: '取消点赞成功!',
        data: '',
        ret: 1
      })
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0,
      data: ''
    })
  }
}