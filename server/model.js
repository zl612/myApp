const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/user';
mongoose.connect(DB_URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '链接错误'));
db.once('open', function() {
  console.log('成功链接');
})

const models = {
  user: {
    'user': { type: String, require: true},
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    // 头像
    'avatar': { type: String },
    // 个人简介或者职位简介
    'desc': { type: String },
    // 职位名
    'title': { type: String },
    // boss需多加两个字段
    'company': { type: String },
    'money': { type: String }
  },
  chat: {
    'chatid': { type: String, require: true, },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    'read': { type: Boolean, default: false },
    'content': { type: String, require: true, default: '' },
    'create_time': { type: Number, default: new Date().getTime()},
  }
}

// new mongoose.Schema(models[m]) 定义一个schema 一种以文件形式存储的数据库模型骨架， 不具备数据库的操作能力
for (let m in models) {
  // 将该Scheme发布生成为model
  // 由schema发布生成的模型，具有抽象属性和行为的数据库操作
  mongoose.model(m, new mongoose.Schema(models[m]))
}

// 导出model模型
module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  } 
}
