var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

Tail = require('tail').Tail;

tail = new Tail("/var/log/workflow/workflow.log");

app.use('/', express.static(__dirname));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


  tail.on("line", function(data) {
	  //io.on('connection', function(socket){
		io.emit('log_data', data);
	  //});
	});


http.listen(2018, function(){
  console.log('listening on *:2018');
});





tail.on("error", function(error) {
  console.log('ERROR: ', error);
});
