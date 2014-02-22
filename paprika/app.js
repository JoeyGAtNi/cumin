var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);

var globalPay = 0;
var globalDeliveries = 0 ;
var lastPaidTime = (new Date()).getTime();

var twitter = require('ntwitter');

// Twilio Credentials 
var accountSid = 'AC3bf75f630d9132bcd7d03300527b0dd3'; 
var authToken = 'ea04068f880d019e46fb9ce1b19dfa09'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 


var tweet = new twitter({
    consumer_key: 'WSmxqzFIf1JXEhfN34MA',
    consumer_secret: 'CSFnwOUZ20JOgpVWiaVuvtkmC6NybXKYc1vpgfGJEs',
    access_token_key: '2355666296-oROjxw2YO7ZtzIdD03PYHHbLc9t4A0mUO1yUdhK',
    access_token_secret: '11iCPu2fD6roKbZOZ3n06jO3pBqYyJw5qbVKj0QqDCqT4'
});

io.sockets.on('connection', function(socket) {
    console.log("initialising socketio ..");
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
   var currentTime = (new Date()).getTime();
   if((currentTime - lastPaidTime)/1000 > 1800){
        tweet
      .verifyCredentials(function (err, data) {
        if(err)
          console.log(err);
      })
      .updateStatus('Come enjoy a 10% discount on all items !!',
        function (err, data) {
          //console.log(data);
          return res.send("Successul tweet");
        });
   }
   lastPaidTime = currentTime;
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


app.post('/rest/v1/sms', function (req, res) {
   client.messages.create({  
                from: "+18327305605", 
                body: "Your truck is on fire !!",   
        }, function(err, message) { 
                console.log(message.sid); 
    });
    return res.send("sms sent");
});
