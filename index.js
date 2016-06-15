var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
	console.log('listening on 3000');
});

/*app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});*/

app.use(express.static(__dirname));

var users = [];
var rooms = [];

io.on('connection', function (socket) {
	//event listeners
	socket.on('join', function (msg) {
		socket.username = msg.username;
		users.push(socket.username);
		socket.emit('login', { username: socket.username, rooms: rooms });
		socket.join(socket.username);
		io.emit('join', { username: socket.username, users: users });
	});
	socket.on('disconnect', function () {
		var i = users.indexOf(socket.username);
		if (i > -1) {
			users.splice(i,1);
		}
		io.emit('leave', { username: socket.username, users: users });
	});
	socket.on('chat message', function (msg, user, room) {
		if (user) {
			socket.broadcast.to(user).emit('chat message', { username: socket.username, message: msg });
		}
		if (room) {
			socket.broadcast.to(room).emit('chat message', { username: socket.username, message: msg });
		}
		if (!user && !room) {
			socket.broadcast.emit('chat message', { username: socket.username, message: msg });	
		}
		
	});
	socket.on('createRoom', function (msg) {
		rooms.push(msg.room);
		socket.join(msg.room);
		io.emit('createRoom', { rooms: rooms });
	});
	socket.on('joinRoom', function (msg) {
		socket.join(msg.room);
	});
});

