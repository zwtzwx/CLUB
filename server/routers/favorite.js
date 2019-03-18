const express = require('express');
const favoriteController = require('../controller/favoriteController');
//const expressJWT = require('express-jwt');
const jwtServe = require('../service/jwt');

const favoriteRouter = express.Router();

// 参详该链接 https://github.com/jfromaniello/express-unless/blob/master/test/unless.tests.js
// 通过该链接总结其验证规则
// 除了带 category 的 get 请求，其他均需要 jwt 登陆验证
favoriteRouter.use(jwtServe.jwtMid.unless({
    path: [                                         
        // {url: '/category', methods: ['GET']},
        {url: /favorite.*/, methods: ['GET']}        
    ]
}));

// 获取分类列表
favoriteRouter.get('/', favoriteController.index);

// 新建分类
favoriteRouter.post('/', favoriteController.store);

// 获取单个分类详情
favoriteRouter.get('/:favorite_id', favoriteController.show);

// 更新单个分类
favoriteRouter.put('/:favorite_id', favoriteController.update);

// 删除单个分类
favoriteRouter.delete('/:favorite_id', favoriteController.destory);


module.exports = favoriteRouter;