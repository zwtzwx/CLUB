/*
 * @Author: zwt
 * @LastEditors: Do not edit
 * @since: 2019-03-12 21:44:08
 * @LastEditTime: 2019-03-13 00:17:27
 */
const category = require('../models/post-category');


exports.index = async function (req, res) {
    try {
        result = await category.categoryIndex();
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    console.log('返回结果为', result);
    res.json({ret:1, msg:'', data: result})
}

exports.store = async function (req, res) {
    console.log('请求数据为：', req.body);
    try {
        result = await category.categoryInsert(req.body);               // 数据验证放到模型中
        console.log(result);
        delete(result.createdAt);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    
    res.json({ret:1, msg:'', data: result})
}

exports.show = function (req, res) {
    
}

exports.update = function (req, res) {
    
}

exports.destory = function (req, res) {
    
}