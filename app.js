var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path')
var express = require('express');
var firebase = require("firebase");

//Change your firebase informations
  var config = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-DOMAIN",
    databaseURL: "YOUR-DATABASE",
    projectId: "YOUR-ID",
    storageBucket: "",
    messagingSenderId: ""
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