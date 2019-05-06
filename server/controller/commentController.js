const Comment = require('../models/comment')
const LikeModel = require('../models/like')
const Token = require('../tools/token')

/**
 *  添加评论
 *  @params
 *  topicID  评论所属的话题 ID
 *  userID  发表评论的用户 ID
 *  parentID 父评论ID
 */
exports.addComment = (req, res) => {
  const params = req.body
  try {
    Comment.addComment(params).then(() => {
      res.json({
        msg: '发表成功!',
        ret: 1,
        data: ''
      })
    })
  } catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0,
      data: ''
    })
  }
}

exports.getComment = async(req, res) => {
  try {
    const topicID = Number.parseInt(req.query.topic_id)
    let token = req.headers.authorization
    if (token) {
      token = await Token.verifyToken(token)
    }
    let comments = await Comment.getComment(topicID)
    // comments.rows.forEach(async(item) => {
    //   let likes = await LikeModel.getLikes(item.id , 0)
    //   console.log(likes.count, likes.rows)
    //   item.likesCount = likes.count
    //   item.isLiked = token ? false : likes.rows.includes(token)
    // })
    for(let length=comments.rows.length, i=0; i<length; i++) {
      let item = comments.rows[i]
      let likes = await LikeModel.getLikes(item.id , 0)
      item.dataValues.likesCount = likes.count
      if (token.id) {
        let isLiked = false
        for(let length=likes.rows.length,i=0; i<length; i++) {
          let ele = likes.rows[0]
          if (ele.userID == token.id) {
            isLiked = true
            break
          }
        }
        item.dataValues.isLiked = isLiked
      } else {
        item.dataValues.isLiked = false
      }
    }
    res.json({
      msg: '获取评论成功!',
      ret: 1,
      data: {
        total: comments.count,
        data: comments.rows
      }
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0,
      data: ''
    })
  }
}

/**
 *  删除评论
 *  暂无权限验证
 *  @params
 *  commentID  评论 ID
 */
exports.delComment = (req, res) => {
  const params = Number.parseInt(req.params.commentID)
  try {
    Comment.delComment(params).then((result) => {
      res.json({
        msg: '删除成功!',
        ret: 1,
        data: result
      })
    })
  } catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0,
      data: ''
    })
  }
}