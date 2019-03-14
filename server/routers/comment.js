const express = require('express');
const commentController = require('../controller/commentController');
//const expressJWT = require('express-jwt');
const jwtServe = require('../service/jwt');

const commentRouter = express.Router();

// 参详该链接 https://github.com/jfromaniello/express-unless/blob/master/test/unless.tests.js
// 通过该链接总结其验证规则
// 除了带 category 的 get 请求，其他均需要 jwt 登陆验证
commentRouter.use(jwtServe.jwtMid.unless({
    path: [                                         
        // {url: '/category', methods: ['GET']},
        {url: /comment.*/, methods: ['GET']}        
    ]
}));

// 获取分类列表
commentRouter.get('/', commentController.index);

// 新建分类
commentRouter.post('/', commentController.store);

// 获取单个分类详情
commentRouter.get('/:comment_id', commentController.show);

// 更新单个分类
commentRouter.put('/:comment_id', commentController.update);

// 删除单个分类
commentRouter.delete('/:comment_id', commentController.destory);


module.exports = commentRouter;