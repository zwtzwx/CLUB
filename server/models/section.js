const DB = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

DB.Section.hasMany(DB.Topic, {foreignKey: 'section_id', sourceKey: 'id'})

exports.getSections = (params) => {
  return DB.Section.findAndCountAll({
    limit: params.size,
    offset: (params.page - 1) * params.size
  })
}

exports.getSectionForClient = () => {
  return DB.Section.findAll({
    where: {
      status: {
        [Op.not]: 0
      }
    }
  })
}

exports.udpateStatus = async(id) => {
  let section = await DB.Section.findById(id, {
    attributes: ['status']
  })
  let status = section.status ? 0 : 1
  return DB.Section.update({ status }, { where: { id } })
}

exports.addSection = (params) => {
  return DB.Section.create({
    name: params.name,
    created: new Date()
  })
}

exports.updateSection = (params) => {
  return DB.Section.update({ name: params.name }, { where: { id: params.id } })
}

exports.getSection = (id) => {
  return DB.Section.findById(id)
}