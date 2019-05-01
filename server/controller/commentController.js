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