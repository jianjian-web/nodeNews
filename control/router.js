const mongo = require('../model/db.js');
const formidable = require('formidable');
const form = new formidable.IncomingForm();

exports.showNews = (req,res)=>{
  mongo._connect().then((db)=>{
    mongo.find('news',{}).then(result =>{
      console.dir(result);
      res.render('news',{
        'newsList': result
      });
    });
  });
}

exports.addNews = (req,res)=>{
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
}

exports.login = (req,res)=>{
  form.parse(req, function(err, fields, files, next) {
    if(err){
      next();
      return;
    }
  mongo._connect().then((db)=>{
    console.dir(fields.uname)
    mongo.find('users',{uname:fields.uname}).then(result =>{
      if(result.length){
        res.send({"message":"用户名已注册","status":-1});
        return
      }
      mongo.insertOne('users',fields).then(resultValue=>{
        res.send({"message":"注册成功,请返回登录","status":1});
      });
    });
  });
});
}
exports.sign = (req,res)=>{
  form.parse(req, function(err, fields, files, next) {
    if(err){
      next();
      return;
    }
    mongo.find('users',{uname:fields.uname}).then(result =>{
      console.dir(result)
      if(result.length){
        if(result[0].upwd == fields.upwd){
          req.session.login = "success";
          req.session.username = fields.uname;
          res.send({"message":"登录成功","status":2})
        }
      }else{
        res.status(401).json({"message":"用户名不存在，请先注册"});
      }
    });
});
}