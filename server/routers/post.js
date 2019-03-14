const express = require('express');
const postController = require('../controller/postController');
//const expressJWT = require('express-jwt');
const jwtServe = require('../service/jwt');

const postRouter = express.Router();

// 参详该链接 https://github.com/jfromaniello/express-unless/blob/master/test/unless.tests.js
// 通过该链接总结其验证规则
// 除了带 category 的 get 请求，其他均需要 jwt 登陆验证
postRouter.use(jwtServe.jwtMid.unless({
    path: [                                         
        // {url: '/category', methods: ['GET']},
        {url: /post.*/, methods: ['GET']}        
    ]
}));

// 获取分类列表
postRouter.get('/', postController.index);

// 新建分类
postRouter.post('/', postController.store);

// 获取单个分类详情
postRouter.get('/:post_id', postController.show);

// 更新单个分类
postRouter.put('/:post_id', postController.update);

// 删除单个分类
postRouter.delete('/:post_id', postController.destory);


module.exports = postRouter;