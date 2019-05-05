const Comment = require('../models/comment')

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

exports.getComment = (req, res) => {
  try {
    const topicID = Number.parseInt(req.query.topic_id)
    Comment.getComment(topicID).then((result) => {
      res.json({
        msg: '获取评论成功!',
        ret: 1,
        data: {
          total: result.count,
          data: result.rows
        }
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