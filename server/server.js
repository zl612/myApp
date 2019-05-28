const express = require('express');
const bodyParser = require('body-parser'); // 表单中间件
const cookiesParser = require('cookie-parser'); // cookie保存
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model.js');
// 引用模型
const Chat = model.getModel('chat');

io.on('connection', function(socket) {
  console.log('链接成功 socket: ');
  // socket.emit('news', { hello: 'world' });
  socket.on('sendmsg', function(data) {
    console.log('data: ', data);
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    
    Chat.create({from, to, chatid, content: msg}, function(err, doc) {
      console.log('doc: ', doc);
      if(!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc));
      }
    })
  })
})

const userRouter = require('./user.js');

app.use(cookiesParser());

// 配置body-parse中间件 ***********处理form表单的中间件**********
/*   bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符，
只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。
返回的对象是一个键值对，当extended为false的时候，
键值对中的***值******就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
 */
app.use(bodyParser.urlencoded({ extended: false }))

/* **************提交json数据的数据********************* */
app.use(bodyParser.json());

app.use('/user', userRouter);

server.listen(3021, () => {
  console.log('server at port 3021');
});


