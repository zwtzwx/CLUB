const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Topics = require('../models/topic');

/**
 *  图片上传
 * @param 
 *  image   base64格式的图片
 *  name    图片名（{用户名}{图片名}）
 */
exports.uploadImage = ((req, res) => {
  const imgObj = req.body;
  // 过滤url
  let imgData = imgObj.image.replace(/^data:image\/\w+;base64,/, '');
  try {
    let randomStr = crypto.randomBytes(20).toString('hex');
    let file = path.parse(imgObj.name);
    let fileName = `${file.name}${randomStr}${file.ext}`;
    const buf = Buffer.from(imgData, 'base64');
    fs.writeFile(`${path.join(__dirname, '../../public/images')}/${fileName}`, buf, (err) => {
      if (err) throw err;
      res.json({
        ret: 1,
        msg: '',
        data: fileName
      })
    })
  }catch(err) {
    res.json({
      ret: 0,
      msg: err.message
    })
  }
});

/**
 *  用户发表话题  发表话题成功后添加 10 积分
 *  @param
 *  id  用户id
 *  plate  板块id
 *  title  话题标题
 *  content  话题内容
 */
exports.topicAdd = (req, res) => {
  const topic = req.body;
  try {
    Topics.topicAdd(topic).then(() => {
      res.json({
        ret: 1,
        data: '',
        msg: '发表成功'
      })
    })
  }catch(err) {
    res.json({
      ret: 0,
      msg: err.message
    })
  } 
}

/**
 *  获取不同分类下的话题
 *  @param
 *    page   当前页  默认为1
 *    size   固定 20
 *    section  分类板块
 */
exports.getTopicList = async(req, res) => {
  let params = req.query;
  if (!params.page) {
    params.page = 1;
  }
  params.size = Number.parseInt(params.size);
  try {
    let result = await Topics.getTopics(params);
    res.json({
      ret: 1,
      msg: 1,
      data: {
        total: result.count,
        data: result.rows,
        currentPage: params.page || 1
      }
    })
  }catch(err) {
    res.json({
      data: '',
      msg: err.message,
      ret: 0
    })
  }
}

/**
 *  根据搜索的标题内容获取话题列表
 *  @param
 *  page default 1
 *  size default 20
 *  query  搜索内容
 */
exports.topicSearch = async(req, res) => {
  let params = req.query
  params.page = Number.parseInt(params.page)
  params.size = Number.parseInt(params.size)
  try {
    let result = await Topics.getTopicsByTitle(params)
    // 将查到 Title 与搜索内容相同的进行高亮显示
    markTitle(params.query, result.rows)
    res.json({
      ret: 1,
      msg: '',
      data: {
        total: result.count,
        data: result.rows,
        currentPage: params.page || 1
      }
    })
  }catch(err) {
    res.json({
      data: '',
      msg: err.message,
      ret: 0
    })
  }
}

/**
 * 获取话题详情
 * @param
 *  req.params.topicID 话题ID
 */
exports.topcDetails = async(req, res) => {
  try {
    let result = await Topics.topcDetails(Number.parseInt(req.params.topicID))
    // 获取用户点击量最高的5条话题
    Topics.getTopicsByUser(result.user.id, 5).then(resp => {
      res.json({
        ret: 1,
        msg: '',
        data: {
          topic: result,
          articles: resp
        }
      })
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0
    })
  }
}

const markTitle = (query, titleList = []) => {
  if (!titleList.length || !query) return
  let reg = new RegExp(query, 'gi')
  titleList.forEach(item => {
    // item.title = item.title.replace(reg, `<mark>${item.title}</mark>`)
    let markList = item.title.match(reg)
    let splitList = item.title.split(reg)
    let number = 1
    markList.forEach((ele, index) => {
      let markStr = `<mark>${ele}</mark>`
      splitList.splice(index + number++, 0, markStr)
    })
    item.title = splitList.join('')
  })
}

/**
 * 删除话题，并删除评论
 * @param
 *  req.params.topicID 话题ID
 */
exports.delTopic = async(req, res) => {
  try {
    // 失败时的抛出错误应该在上级函数指定
    let result = await Topics.delTopic(Number.parseInt(req.params.topicID))
    res.json({
      msg: '删除成功',
      ret: 1
    })
  }catch(err) {
    res.status(500).json({
      msg: err.message,
      ret: 0
    })
  }
}
