const express = require('express');
const mongoose = require('mongoose');

const DBUrl = 'mongodb://127.0.0.1:27017/user';
mongoose.connect(DBUrl, {useNewUrlParser:true});
mongoose.connection.on('connect', function() {
  console.log('mongo connect success');
});

const User = mongoose.model('user', new mongoose.Schema({
  name: {type: String, require: true},
  age: { type: Number, require: true},
}));

User.create({
  name: 'zhangsan',
  age: 189,
}, function(err, doc){
  if(!err) {
    console.log('doc', doc);
  }else {
    console.log(err);
  }
});


const app = express();

app.get('/', function(req, res) {
  res.json({
    name: 'chirt',
  });
})

app.listen(3003, () => {
  console.log('listen at port 3003');
})