/*
 * @Author: zwt
 * @LastAuthor: Do not edit
 * @since: 2019-03-12 21:44:08
 * @lastTime: 2019-03-14 21:01:36
 */
const category = require('../models/post-category');


/**
 * @api {get} /category 分类列表
 * @apiName index
 * @apiGroup Category
 * @apiPermission public
 * @apiDescription 分类列表
 * @apiParam {Number} page 页码
 * @apiParam {String} size 页面大小，默认为20
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
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

/**
 * @api {post} /category 添加分类
 * @apiName store
 * @apiGroup Category
 * @apiPermission admin
 * @apiDescription 添加分类
 * @apiParam {String} category_name          分类名
 * @apiParam {String} category_description   分类描述
 * @apiParam {String} major_image            主图
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
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

/**
 * @api {get} /category/{id} 分类详情
 * @apiName show
 * @apiGroup Category
 * @apiPermission admin
 * @apiDescription 分类详情
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.show = async function (req, res) {
    category_id = req.params.category_id;
    try {
        result = await category.findCategoryById(category_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {put} /category/{id} 修改分类
 * @apiName update
 * @apiGroup Category
 * @apiPermission admin
 * @apiDescription 修改分类
 * @apiParam {String} category_name          分类名
 * @apiParam {String} category_description   分类描述
 * @apiParam {String} major_image            主图
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.update = async function (req, res) {
    category_id = req.params.category_id;
    try {
        result = await category.updateCategory(category_id, req.body);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('更新错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {delete} /category/{id} 删除分类
 * @apiName destory
 * @apiGroup Category
 * @apiPermission admin
 * @apiDescription 删除分类
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.destory = async function (req, res) {
    category_id = req.params.category_id;
    try {
        result = await category.destroyCategory(category_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    if (result==1) {
        res.json({ret:1, msg:'刪除成功', data: result});    
    } else {
        res.json({ret:1, msg:'该分类已刪除', data: result});
    }
    
}