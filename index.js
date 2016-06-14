var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
	console.log('listening on 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	//event listeners
	socket.on('join', function (msg) {
		socket.username = msg.email;
		console.log(socket.username + ' joined');
		socket.broadcast.emit('join', socket.username);
		socket.join(socket.username);
	});
	socket.on('disconnect', function () {
		console.log(socket.username + ' left');
		socket.broadcast.emit('leave', socket.username);
	});
	socket.on('chat message', function (msg, user) {
		console.log(socket.username + ': ' + msg);
		if (user) {
			socket.broadcast.to(user).emit('chat message', { username: socket.username, message: msg });
		}
		else {
			socket.broadcast.emit('chat message', { username: socket.username, message: msg });	
		}
		
	});
});

