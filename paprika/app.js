var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);

var globalPay = 0;
var globalDeliveries = 0 ;
var lastPaidTime = new Date();

var twitter = require('ntwitter');

var tweet = new twitter({
    consumer_key: 'WSmxqzFIf1JXEhfN34MA',
    consumer_secret: 'CSFnwOUZ20JOgpVWiaVuvtkmC6NybXKYc1vpgfGJEs',
    access_token_key: '2355666296-oROjxw2YO7ZtzIdD03PYHHbLc9t4A0mUO1yUdhK',
    access_token_secret: '11iCPu2fD6roKbZOZ3n06jO3pBqYyJw5qbVKj0QqDCqT4'
});


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



app.post('/rest/v1/pay', function (req, res) {
   globalPay = globalPay + 1 ;
   io.sockets.emit("pay",globalPay);
   return res.send("pay recorded");
});

app.get('/rest/v1/pay', function (req, res) {
  return res.send(""+globalPay);
});

app.post('/rest/v1/deliver', function (req, res) {
   globalDeliveries = globalDeliveries + 1 ;
   io.sockets.emit("deliveries",globalDeliveries);
   return res.send("delivery recorded");
});

app.get('/rest/v1/deliver', function (req, res) {
  return res.send(""+globalDeliveries);
});


app.post('/rest/v1/tweet', function (req, res) {
   tweet
  .verifyCredentials(function (err, data) {
    if(err)
      console.log(err);
  })
  .updateStatus('Come enjoy a snow cone in this hot weather !!',
    function (err, data) {
      //console.log(data);
      return res.send("Successul tweet");
    }
  );
});