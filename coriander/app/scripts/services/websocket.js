'use strict';

angular.module('corianderApp')
.service('Websocket', function Websocket() {
	var logLevel = 'debug';
	var socket = io.connect($rootScope.urlSocket, {query: "authtoken=" + $rootScope.user.authtoken});
	var webSocket = {
		openConnections: {},
            //adds devices to the device list as they are registered
            connectPay: function () {

            	socket.emit('subscribe', 'pay' );

            	socket.on('error', function (reason){
            		console.error('Unable to connect Socket.IO', reason);
            	});

            	socket.on('connect', function (){
            		console.info('successfully established a working and authorized connection');
            	});

            	socket.on('pay', function (data) {
            		console.log("Got a websocket message on pay");
            		var message = data;
            		console.log(message);
            		try {
                        var json = message; //jQuery.parseJSON(message);
                        console.log(json);
                        if (json !== undefined) {

						}
			} catch (e) {
				console.log("This doesn\'t look like a valid JSON: ", message.data);
				throw e;
				return;
			}
			});
		},
		connectDeliver: function () {

            	socket.emit('subscribe', 'deliver' );

            	socket.on('error', function (reason){
            		console.error('Unable to connect Socket.IO', reason);
            	});

            	socket.on('connect', function (){
            		console.info('successfully established a working and authorized connection');
            	});

            	socket.on('pay', function (data) {
            		console.log("Got a websocket message on deliver");
            		var message = data;
            		console.log(message);
            		try {
                        var json = message; //jQuery.parseJSON(message);
                        console.log(json);
                        if (json !== undefined) {

						}
			} catch (e) {
				console.log("This doesn\'t look like a valid JSON: ", message.data);
				throw e;
				return;
			}
			});
		}
	}
return webSocket;
});
