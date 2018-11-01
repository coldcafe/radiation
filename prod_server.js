var express = require('express');
var app = express();
app.use(express.static(__dirname + '/antd'));
//将其他路由，全部返回index.html
app.use('*', function(req, res) {
  res.sendFile(__dirname + '/antd/index.html')
});
app.listen(5000)