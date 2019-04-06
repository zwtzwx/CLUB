const Sequelize = require('sequelize');
const sequelize = require('../tools/db');

// 帖子分类模型
const Category = sequelize.define('post_category', {
    id: {
      type: Sequelize.INTEGER,
      field: 'category_id',   // id 映射到数据表中的 user_id 字段
      primaryKey: true,   // 定义主键
      autoIncrement: true  // 定义自增字段
    },
    category_name: {
      type: Sequelize.STRING,
      field: 'category_name',
      unique: true,   // 定义唯一性约束
      allowNull: false,
    },
    category_description: {
      type: Sequelize.STRING,
      field: 'category_description',
      comment: '分类描述',
      allowNull: false,
    },
    major_image: {
      type: Sequelize.STRING,
      field: 'major_image',
      comment: '分类主图',
      allowNull: true,
    }
  }, {
    freezeTableName: true,

    // 软删除
    paranoid: true,

  });

exports.categoryIndex = async function () {
  categories = await Category.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  return categories;
}

exports.categoryInsert = async function (data) {
  categories = await Category.create({
    category_name: data.category_name,
    category_description: data.category_description,
    major_image: data.major_image,
  });
  return categories;
}

exports.findCategoryById = async function (category_id) {
  category = await Category.findOne({
    where: { id: category_id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  return category;
}

exports.updateCategory = async function (category_id, data) {
  categoryIns = await Category.findByPk(category_id);

  result = await categoryIns.update({         // 数据库应该添加验证规则，不许添加空字符串、暂时没加
    category_name: data.category_name,
    category_description: data.category_description,
    major_image: data.major_image,
  });
  return result;
}

exports.destroyCategory = async function (category_id) {

  result = await Category.destroy({
    where: { id: category_id }
  });
  return result;
}