const express = require('express');
const categoryController = require('../controller/categoryController');
//const expressJWT = require('express-jwt');
const jwtServe = require('../service/jwt');

const categoryRouter = express.Router();

// 参详该链接 https://github.com/jfromaniello/express-unless/blob/master/test/unless.tests.js
// 通过该链接总结其验证规则
// 除了带 category 的 get 请求，其他均需要 jwt 登陆验证
categoryRouter.use(jwtServe.jwtMid.unless({
    path: [                                         
        // {url: '/category', methods: ['GET']},
        {url: /category.*/, methods: ['GET']}        
    ]
}));

// 获取分类列表
categoryRouter.get('/', categoryController.index);

// 新建分类
categoryRouter.post('/', categoryController.store);

// 获取单个分类详情
categoryRouter.get('/:category_id', categoryController.show);

// 更新单个分类
categoryRouter.put('/:category_id', categoryController.update);

// 删除单个分类
categoryRouter.delete('/:category_id', categoryController.destory);


module.exports = categoryRouter;