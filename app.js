const express = require('express');
const app = new express();
const session = require("express-session");
const router = require("./control/router.js");

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/',router.showNews);

app.get('/login', (req,res)=>{
  res.render('login',{});
});
app.post('/login',router.login);

app.get('/sign', (req,res)=>{
  res.render('sign',{});
});
app.post('/sign',router.sign);

app.use('*',(req,res,next)=>{ // 所有需要登录的请求，都要在这后面。
  if(req.session.login==='success'){
    next()
  }else{
    res.status(401).json({"message":"请登录"});
  }
})
app.get('/add',(req,res)=>{
  res.render('add');
});

app.post('/add',router.addNews);

app.get('/test',(req,res)=>{
  res.send('这是test');
});

app.all('*',(req,res)=>{
  res.render('err');
});

app.listen(3000);