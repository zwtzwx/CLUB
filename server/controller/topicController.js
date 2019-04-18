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
 *  用户发表话题
 *  @param
 *  id  用户id
 *  plate  板块id
 *  title  话题标题
 *  content  话题内容
 */
exports.topicAdd = (req, res) => {
  const topic = req.body;
  console.log(topic);
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