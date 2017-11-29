const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config.js');
const util = require('util');

const _connect = () => { // 连接数据库
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, (err, db) => {
      if (err) {
        console.log('连接失败');
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

const insertOne = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    _connect().then((db) => {
      db.collection(collectionName).insertOne(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        db.close();
      });
    });

  });
}

const insertMany = (collectionName, arr) => {
  return new Promise((resolve, reject) => {
    _connect().then((db) => {
      db.collection(collectionName).insertMany(arr, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        db.close();
      });
    });

  });
}

const insert = (collectionName, any) => {
  return new Promise((resolve, reject) => {
    _connect().then((db) => {
      db.collection(collectionName).insert(any, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        db.close();
      });
    });

  });
}

const find = (collectionName, key) => {
  return new Promise((resolve, reject) => {
    _connect().then((db) => {
      db.collection(collectionName).find(key,{},(err,data)=>{   // find返回的是一个cursor对象
        if(err){
          reject(err);
        }else{
          if(data){
            let result=[];
            data.each((err,item)=>{
              if(err){
                reject(err);
              }else if(item){
                result.push(item);
              }else{
                resolve(result);
              }
            });
          }
        }
      });
    });
  });
}

module.exports = {
  _connect,
  insertOne,
  insertMany,
  insert,
  find,
}