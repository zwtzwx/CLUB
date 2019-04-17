const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

exports.topicAdd((req, res) => {
  const topic = req.body;
  
})