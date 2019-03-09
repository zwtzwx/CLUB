var createError = require('http-errors');
const express = require('express');
const path = require('path');
var logger = require('morgan');
// var cors = require('cors')

// 导入路由文件，每个文件是一个路由组
const Router = require('./routers/router');

const app = express();

app.set('views', [__dirname + '/views' ,path.resolve(__dirname, '../')]);
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// app.use('/public', express.static(path.resolve(__dirname, '../pulbic')));
app.use(logger('dev'));                                         // 日志中间件
// app.use(cors())                                               // 跨域中间件 此处用不上
app.use(express.json());                                      // 基于 body-parser，不用再安装
app.use(express.urlencoded({ extended: false }));             // 基于 body-parser，不用再安装，extended 是 false 只能是字符串和数组，为true可以是任何类型
app.use('/public', express.static(path.join(__dirname, '../public'))); // 设置挂载静态文件目录，生产环境用 nginx 


app.get('/', (req, res) => {
    res.render('index', {
      title: 'CLUB'
    })
  });

  
// api 接口路由信息
app.use('/web', Router);


// 捕获 404 并且继续错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  // 设置本地化，仅有生产环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};       // 此处是一处判断当前环境，最佳实践为通过环境变量设置

  // 渲染错误界面
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, () => console.log('Starting in 3000...'));