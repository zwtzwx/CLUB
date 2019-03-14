/*
 * @Author: zwt
 * @LastAuthor: Do not edit
 * @since: 2019-03-12 21:44:08
 * @lastTime: 2019-03-14 21:00:00
 */
const comment = require('../models/post-comment');


/**
 * @api {get} /comment 评论列表
 * @apiName index
 * @apiGroup comment
 * @apiPermission public
 * @apiDescription 评论列表
 * @apiParam {Number} page 页码
 * @apiParam {String} size 页面大小，默认为20
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.index = async function (req, res) {
    try {
        result = await comment.commentIndex();
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    console.log('返回结果为', result);
    res.json({ret:1, msg:'', data: result})
}

/**
 * @api {post} /comment 添加评论
 * @apiName store
 * @apiGroup comment
 * @apiPermission admin
 * @apiDescription 添加评论
 * @apiParam {String} comment_content    评论内容
 * @apiParam {String} like_num           点赞数
 * @apiParam {String} user_id            用户 id
 * @apiParam {String} parent_id          父评论
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.store = async function (req, res) {
    console.log('请求数据为：', req.body);
    try {
        result = await comment.commentInsert(req.body);               // 数据验证放到模型中
        console.log(result);
        delete(result.createdAt);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    
    res.json({ret:1, msg:'', data: result})
}

/**
 * @api {get} /comment/{id} 评论详情
 * @apiName show
 * @apiGroup comment
 * @apiPermission admin
 * @apiDescription 评论详情
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.show = async function (req, res) {
    comment_id = req.params.comment_id;
    try {
        result = await comment.findCommentById(comment_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {put} /comment/{id} 修改评论
 * @apiName update
 * @apiGroup comment
 * @apiPermission admin
 * @apiDescription 修改评论
 * @apiParam {String} comment_content    评论内容
 * @apiParam {String} like_num           点赞数
 * @apiParam {String} user_id            用户 id
 * @apiParam {String} parent_id          父评论
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.update = async function (req, res) {
    comment_id = req.params.comment_id;
    try {
        result = await comment.updateComment(comment_id, req.body);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('更新错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    res.json({ret:1, msg:'', data: result});
}

/**
 * @api {delete} /comment/{id} 删除评论
 * @apiName destory
 * @apiGroup comment
 * @apiPermission admin
 * @apiDescription 删除评论
 * @apiParamExample 这里是参数示例
 * {}
 * @apiSuccessExample 这里是成功返回示例
 * {}
 */
exports.destory = async function (req, res) {
    comment_id = req.params.comment_id;
    try {
        result = await comment.destroyComment(comment_id);               // 数据验证放到模型中
        console.log(result);
    } catch (error) {
        console.log('查询错误，错误原因为：', error);
        res.json({ret:0, msg:'', data: error})
    }
    if (result==1) {
        res.json({ret:1, msg:'刪除成功', data: result});    
    } else {
        res.json({ret:1, msg:'该评论已刪除', data: result});
    }
    
}