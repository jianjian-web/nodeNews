const express = require('express');
const app = new express();
const mongo = require('./model/db.js');
const formidable = require('formidable');
const form = new formidable.IncomingForm();

app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/',(req,res)=>{
  mongo._connect().then((db)=>{
    mongo.find('news',{}).then(result =>{
      console.dir(result);
      res.render('news',{
        'newsList': result
      });
    });
  });
});

app.get('/add',(req,res)=>{
    res.render('add');
});
app.post('/add',(req,res)=>{
  form.parse(req, function(err, fields, files, next) {
    if(err){
      next();
      return;
    }
    mongo._connect().then((db)=>{
          mongo.insert('news',[fields]).then(result =>{
            res.redirect('/')
          });
        });
  })
});

app.all('*',(req,res)=>{
  res.render('err');
});

app.listen(3000);