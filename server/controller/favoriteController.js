/*
 * @Author: zwt
 * @LastAuthor: Do not edit
 * @since: 2019-03-18 20:51:59
 * @lastTime: 2019-03-18 21:02:52
 */
const favorite = require('../models/favorite');
const utils = require('util');


/**
 * @api {get} /favorite 收藏列表
 * @apiName index
 * @apiGroup favorite
 * @apiPermission public
 * @apiDescription 收藏列表
 * @apiParam {Number} page 页码
 * @apiParam {Number} size 页面大小，默认为10
 * @apiParam {Number} favorite_type 收藏类型 1，收藏。2，用户。3.评论'
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

    let favorite_type = req.param('favorite_type') || 0

    try {
        result = await favorite.favoriteIndex(page, size, favorite_type);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error});
    }
    // console.log('返回结果为', result);

    res.json({ret:1, msg:'', data: {data: result.rows, currentPage: page, total: result.count, size: size}})
}

/**
 * @api {post} /favorite 添加收藏
 * @apiName store
 * @apiGroup favorite
 * @apiPermission admin
 * @apiDescription 添加收藏
 * @apiParam {String} favorites_id    收藏 id
 * @apiParam {String} favorites_type  收藏类型
 * @apiParam {String} user_id   关联用户
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.store = async function (req, res) {
    console.log('请求数据为：', req.body);
    try {
        result = await favorite.favoriteInsert(req.body);               // 数据验证放到模型中
        console.log(result);
        delete(result.createdAt);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    
    res.json({ret:1, msg:'', data: result})
}

/**
 * @api {get} /favorite/{id} 收藏详情
 * @apiName show
 * @apiGroup favorite
 * @apiPermission admin
 * @apiDescription 收藏详情
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.show = async function (req, res) {
    favorite_id = req.params.favorite_id;
    try {
        result = await favorite.findfavoriteById(favorite_id);               // 数据验证放到模型中
        console.log(result.dataValues);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {put} /favorite/{id} 修改收藏
 * @apiName update
 * @apiGroup favorite
 * @apiPermission admin
 * @apiDescription 修改收藏
 * @apiParam {String} favorites_id    收藏 id
 * @apiParam {String} favorites_type  收藏类型
 * @apiParam {String} user_id   关联用户
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.update = async function (req, res) {
    favorite_id = req.params.favorite_id;
    try {
        result = await favorite.updateFavorite(favorite_id, req.body);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('更新错误，错误原因为：', error);
        res.json({ret:0, msg:''})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {delete} /favorite/{id} 删除收藏
 * @apiName destory
 * @apiGroup favorite
 * @apiPermission admin
 * @apiDescription 删除收藏
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.destory = async function (req, res) {
    favorite_id = req.params.favorite_id;
    try {
        result = await favorite.destroyFavorite(favorite_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    if (result==1) {
        res.json({ret:1, msg:'刪除成功', data: result});    
    } else {
        res.json({ret:1, msg:'该收藏已刪除', data: result});
    }
    
}