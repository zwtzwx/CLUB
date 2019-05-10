const express = require('express')
const bodyParser = require('body-parser')
const mailControl = require('./controller/mailController')
const userControl = require('./controller/userController')
const topicControl = require('./controller/topicController')
const commentControl = require('./controller/commentController')
const likeControl = require('./controller/likeController')
const sectionControl = require('./controller/sectionController')
const multer = require('multer')
const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
var upload = multer({ dest: 'uploads/' })


// 客户端

// 发送注册邮箱
router.post('/mail/register', mailControl.registerMail)
// 发送忘记密码邮箱
router.post('/mail/forget', mailControl.forgetMail)

// 注册
router.post('/user/signup', userControl.register)

// 登录
router.post('/user/signin', userControl.login)

// 根据用户 ID 获取用户信息
router.get('/user/user-info', userControl.getUserInfo)
// 修改个人信息
router.put('/user/user-info', userControl.updateUser)
// 修改密码
router.put('/user/password', userControl.updatePassword)
// 忘记密码
router.post('/user/forget', userControl.forget)
// 获取用户发表的话题
router.get('/user/topics', userControl.getTopicsByUser)

// 获取积分排行榜
router.get('/client/integray', userControl.TopIntegray)

// 用户头像上传
router.post('/user/avatar', upload.single('avatar'), userControl.avatarUpload)

// 图片上传(发表话题或发表评论中的图片)
router.post('/images/uploading', topicControl.uploadImage)

// 发表话题
router.post('/topic', topicControl.topicAdd)

// 获取话题列表
router.get('/topic', topicControl.getTopicList)

// 获取话题详情
router.get('/topic/:topicID', topicControl.topcDetails)

// 根据输入的标题查询话题列表
router.get('/search', topicControl.topicSearch)

// 删除话题
router.delete('/topic/:id', topicControl.delTopic)

// 添加评论
router.post('/comment', commentControl.addComment)
// 获取评论列表
router.get('/comment', commentControl.getComment)
// 删除评论
router.delete('/comment/:commentID', commentControl.delComment)

// 点赞
router.post('/like', likeControl.addLike)
// 取消点赞
router.delete('/like', likeControl.removeLike)

// 获取板块列表
router.get('/section', sectionControl.getSectionForClient)

// 管理员端

// 获取版块列表
router.get('/admin/section', sectionControl.getSections)
// 添加版块
router.post('/admin/section', sectionControl.addSection)
// 修改板块
router.put('/admin/section/:id', sectionControl.updateSection)
// 获取单个版块信息
router.get('/admin/section/:id', sectionControl.getSection)
router.put('/admin/section/status/:id', sectionControl.updateSectionStatus)

// 获取用户列表
router.get('/admin/user', userControl.getUsers)
// 取消用户权限
router.put('/admin/user/status/:id', userControl.updateUserStatus)

// 获取话题列表
router.get('/admin/topic', topicControl.getTopicList)
// 话题推荐、取消推荐
router.put('/admin/topic/recommend/:id', topicControl.updateRecommend)
// 删除话题
router.delete('/admin/topic/:id', topicControl.delTopic)
module.exports = router;
