var express = require('express');
var app = express();
var server  = require('http').createServer(app);
//var io = require('socket.io').listen(server);

var globalPay = 0;
var orderNumber = 1000;
var orderList = [];
var globalDeliveries = 0 ;
var lastPaidTime = (new Date()).getTime();

var twitter = require('ntwitter');

// Twilio Credentials 
var accountSid = 'XXXXXX'; 
var authToken = 'YYYYYYYYYY'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 


var tweet = new twitter({
    consumer_key: 'XXXXX',
    consumer_secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    access_token_key: 'xxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_secret: 'xxxxxx-xxxxxxx'
});

//io.sockets.on('connection', function(socket) {
//    console.log("initialising socketio ..");
//});

server.listen(3000);
//io.set( 'origins', '*niwsc.com*:*' );
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.use(express.logger("dev"));

app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendfile(__dirname + '/index.html');
  //return res.send("hello")
});



app.post('/rest/v1/pay', function (req, res) {
   var currentTime = (new Date()).getTime();
   var timediff = (currentTime - lastPaidTime)/1000 ;
   console.log("timediff : "+timediff);
   if(timediff > 60){
       console.log("in time difference logic");
       var random = Math.floor((Math.random()*100)+1);
        tweet
      .verifyCredentials(function (err, data) {
        if(err)
          console.log(err);
      })
      .updateStatus('Come enjoy a 10% discount on all items !! #'+random,
        function (err, data) {
          console.log("successfull tweet");
          //return res.send("Successul tweet");
        });
   }
   lastPaidTime = currentTime;
   globalPay = globalPay + 1 ;
   orderNumber = orderNumber + 1;
   orderList.push(orderNumber);
   io.sockets.emit("pay",globalPay);
   return res.send("order number : "+orderNumber);
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
    var random = Math.floor((Math.random()*100)+1);
   tweet
  .verifyCredentials(function (err, data) {
    if(err)
      console.log(err);
     
  })
  .updateStatus('Come enjoy a snow cone in this hot weather !! #'+random,
    function (err, data) {
        if(err)
            console.log(err);
        if(err)
            console.log(data);
        
        return res.send("Successul tweet");
    }
  );
});


app.post('/rest/v1/sms', function (req, res) {
   client.messages.create({
                to: "7138262502", 
                from: "+18327305605", 
                body: "Your truck is on fire !!",   
        }, function(err, message) { 
                console.log(message.sid); 
    });
    return res.send("sms sent");
});

app.get('/rest/v1/orderlist', function (req, res) {
  return res.send(""+orderList);
});

