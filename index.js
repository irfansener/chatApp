var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path')
var express = require('express');
var firebase = require("firebase");

  var config = {
    apiKey: "AIzaSyAGsznoH31EokWwtoLFbwFuf7wvdcZC3uI",
    authDomain: "node-js-chat-5c7f4.firebaseapp.com",
    databaseURL: "https://node-js-chat-5c7f4.firebaseio.com",
    projectId: "node-js-chat-5c7f4",
    storageBucket: "",
    messagingSenderId: "73732178839"
  };
  firebase.initializeApp(config);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log(`${socket.id} has connected`);
  socket.on('chat message', function(msg){
  	console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});