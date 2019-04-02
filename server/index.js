const express = require('express');
const Router = require('./router');
const path = require('path');
const cors = require('cors');
const app = express();

app.set('views', path.resolve(__dirname, 'view'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// app.use('/public', express.static(path.resolve(__dirname, '../pulbic')));
app.use('/public', express.static(path.join(__dirname, '../public')));
// 允许跨域请求
app.use(cors());
  
// api 接口路由信息
app.use('/web', Router);

app.listen(3000, () => console.log('Starting in 3000...'));