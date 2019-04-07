/*
 * @Author: zwt
 * @LastAuthor: Do not edit
 * @since: 2019-03-12 21:44:08
 * @lastTime: 2019-03-18 20:34:21
 */
const post = require('../models/post');
const comment = require('../models/post-comment');
const utils = require('util');


/**
 * @api {get} /post 帖子列表
 * @apiName index
 * @apiGroup post
 * @apiPermission public
 * @apiDescription 帖子列表
 * @apiParam {Number} page 页码
 * @apiParam {Number} size 页面大小，默认为20
 * @apiParam {Number} category_id 分类 id 默认为所有（0）
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.index = async function (req, res) {
    let page = '', size = '';
    if(req.param('page')&&(req.param('page').trim())!=""){
        page = parseInt(req.param("page").trim());
    }
    if(req.param('size')&&(req.param('size').trim())!=""){
        size = parseInt(req.param("size").trim());
    }
    page = page || 1;
    size = size || 10;
    console.log('page=', page, 'size=', size)

    let category_id = req.param('category_id') || 0

    try {
        result = await post.postIndex(page, size, category_id);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error});
    }
    // console.log('返回结果为', result);

    for (let index = 0; index < result.rows.length; index++) {              // 添加评论条数
        const row = result.rows[index];
        count = await comment.countComments(row.dataValues.id);
        result.rows[index].dataValues.comment = count;
    }

    // result.rows.forEach(async function(row, index) {
    //     count = await comment.countComments(row.dataValues.id);
        
    //     console.log('取到的评论数计数为：', count);
    //     result.rows[index].dataValues.comment = count;
    //     console.log('当前遍历的对象为：', result.rows[index].dataValues);

    // });

    res.json({ret:1, msg:'', data: {data: result.rows, currentPage: page, total: result.count, size: size}})
}

/**
 * @api {post} /post 添加帖子
 * @apiName store
 * @apiGroup post
 * @apiPermission admin
 * @apiDescription 添加帖子
 * @apiParam {String} post_title    帖子标题
 * @apiParam {String} post_content  帖子详情
 * @apiParam {String} major_image   主图
 * @apiParam {String} category_id   分类
 * @apiParam {String} user_id       发帖人
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.store = async function (req, res) {
    console.log('请求数据为：', req.body);
    try {
        result = await post.postInsert(req.body);               // 数据验证放到模型中
        console.log(result);
        delete(result.createdAt);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    
    res.json({ret:1, msg:'', data: result})
}

/**
 * @api {get} /post/{id} 帖子详情
 * @apiName show
 * @apiGroup post
 * @apiPermission admin
 * @apiDescription 帖子详情
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.show = async function (req, res) {
    post_id = req.params.post_id;
    try {
        result = await post.findPostById(post_id);               // 数据验证放到模型中
        console.log(result.dataValues);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {put} /post/{id} 修改帖子
 * @apiName update
 * @apiGroup post
 * @apiPermission admin
 * @apiDescription 修改帖子
 * @apiParam {String} post_title    帖子标题
 * @apiParam {String} post_content  帖子详情
 * @apiParam {String} major_image   主图
 * @apiParam {String} category_id   分类
 * @apiParam {String} user_id       发帖人
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.update = async function (req, res) {
    post_id = req.params.post_id;
    try {
        result = await post.updatePost(post_id, req.body);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('更新错误，错误原因为：', error);
        res.json({ret:0, msg:''})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {delete} /post/{id} 删除帖子
 * @apiName destory
 * @apiGroup post
 * @apiPermission admin
 * @apiDescription 删除帖子
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.destory = async function (req, res) {
    post_id = req.params.post_id;
    try {
        result = await post.destroyPost(post_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    if (result==1) {
        res.json({ret:1, msg:'刪除成功', data: result});    
    } else {
        res.json({ret:1, msg:'该帖子已刪除', data: result});
    }
    
}