const sectionModel = require('../models/section')

/**
 *  管理员端
 *  获取分页的板块列表
 */
exports.getSections = (req, res) => {
  const params = req.query
  params.page = Number(params.page)
  params.size = Number(params.size)
  try {
    sectionModel.getSections(params).then(result => {
      res.json({
        msg: '获取版块成功!',
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

exports.getSectionForClient = (req, res) => {
  try {
    sectionModel.getSectionForClient().then(result => {
      res.json({
        msg: '',
        ret: 1,
        data: result
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

/**
 *  添加版块
 *  @param
 *  name 版块名
 */
exports.addSection = (req, res) => {
  const params = req.body
  try {
    sectionModel.addSection(params).then(() => {
      res.json({
        msg: '添加成功!',
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

/**
 *  管理端
 *  更新版块
 */
exports.updateSection = (req, res) => {
  const id = req.params.id
  const params = req.body
  params.id = id
  try {
    sectionModel.updateSection(params).then(() => {
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

/**
 *  管理端
 *  根据 id 获取版块详情
 */
exports.getSection = (req, res) => {
  const id = req.params.id
  try {
    sectionModel.getSection(id).then((result) => {
      res.json({
        msg: '',
        ret: 1,
        data: result
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

/**
 *  管理端
 *  显示和隐藏版块
 */
exports.updateSectionStatus = (req, res) => {
  const id = req.params.id
  try {
    sectionModel.udpateStatus(id).then(() => {
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