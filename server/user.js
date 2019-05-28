const express = require('express');
const utils = require('utility');

const Router = express.Router();

const model = require('./model.js');
// 引用模型
const User = model.getModel('user');
const Chat = model.getModel('chat');

Router.get('/list', function(req, res) {
  // 类型为 genius 或 boss查询
  const { type } = req.query;
  User.find({type}, function(err, doc) {
    return res.json({ code: 0, data: doc });
  })
})

// 登录
Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd)}, function(err, doc) {
    // console.log('doc', doc)
    if (err) {
      return res.json({ code: 1, msg: '用户名或者密码出错' });
    } else if (doc == null) {
      return res.json({ code: 1, msg: '用户名或者密码出错' });
    } else {
      res.cookie('userid', doc._id);
      return res.json({ code: 0, data: doc });
    }
  })
})

// 注册
Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body;
  
  // 先查询一遍数据库，看看有重名没
  User.findOne({user}, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(e, d) {
      if(e) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      const { user, type, _id } = d;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: {user, type, _id} })
    })
  })
})

// 权限判断
Router.get('/info', function(req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
  // 用户有没有cookie
})

// 完善boss信息
Router.post('/updata', function(req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function(err, doc){
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type,
    }, body)
    return res.json({ code: 0, data })
  })
})

// 查询聊天列表
Router.get('/getMsgList', function(req, res) {
  const user = req.cookies.user;
  Chat.find({}, function(err, doc) {
    if(!err) {
      return res.json({code: 0, msg: doc})
    }
  })
})


function md5Pwd(pwd) {
  const cc = 'QNKFASAFSDKLV_=*@@#@$%^%&^11314654654csd(WRTYU":>":<LNJGHUIGUIG'
  return utils.md5(utils.md5(pwd + cc));
}

module.exports = Router;