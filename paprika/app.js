var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);


server.listen(3000);
//io.set( 'origins', '*niwsc.com*:*' );
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());


app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use(express.logger("dev"));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
  //return res.send("hello")
});