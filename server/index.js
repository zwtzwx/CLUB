const express = require('express');
const Router = require('./router');
const path = require('path');
const app = express();

app.set('views', path.resolve(__dirname, '../'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// app.use('/public', express.static(path.resolve(__dirname, '../pulbic')));
app.use('/public', express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.render('index', {
      title: 'CLUB'
    })
  });

  
// api 接口路由信息
app.use('/web', Router);

app.listen(3000, () => console.log('Starting in 3000...'));