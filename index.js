var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// server
http.listen(port, function () {
	console.log('listening on %d', port);
});

app.use(express.static(__dirname));

// socketIO - Redis adapter
var socketio_redis = require('socket.io-redis');
io.adapter(socketio_redis({ host: 'localhost', port: 6379 }));

// Redis Client
var redis = require('./node_modules/socket.io-redis/node_modules/redis');
var redisClient = redis.createClient();

//var users = [];
//var rooms = [];

io.on('connection', function (socket) {
	//event listeners
	socket.on('join', function (msg) {
		socket.username = msg.username;
		redisClient.lpush('users', socket.username);
		socket.join(socket.username);
		redisClient.lrange('users', 0, -1, function (err, users) {
			console.log(users);
			redisClient.lrange('rooms', 0, -1, function (err, rooms) {
				console.log(rooms);
				socket.emit('login', { username: socket.username });
				io.emit('join', { username: socket.username, users: users, rooms: rooms });	
			});
		});
		/*socket.username = msg.username;
		users.push(socket.username);
		socket.emit('login', { username: socket.username, rooms: rooms });
		socket.join(socket.username);
		io.emit('join', { username: socket.username, users: users });*/
	});
	socket.on('disconnect', function () {
		redisClient.lrem('users', 0, socket.username, function (err, res) {
			redisClient.lrange('users', 0, -1, function (err, res) {
				console.log(res);
				io.emit('leave', { username: socket.username, users: res });
			});
		});
		/*var i = users.indexOf(socket.username);
		if (i > -1) {
			users.splice(i,1);
		}
		io.emit('leave', { username: socket.username, users: users });*/
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
		//rooms.push(msg.room);
		redisClient.lpush('rooms', msg.room);
		socket.join(msg.room);
		redisClient.lrange('rooms', 0, -1, function (err, rooms) {
			console.log(rooms);
			io.emit('createRoom', { rooms: rooms });	
		});
		//io.emit('createRoom', { rooms: rooms });
	});
	socket.on('joinRoom', function (msg) {
		socket.join(msg.room);
		socket.broadcast.to(msg.room).emit('joinRoom', { username: socket.username, room:msg.room });
	});
	socket.on('leaveRoom', function (msg) {
		socket.leave(msg.room);
		socket.broadcast.to(msg.room).emit('leaveRoom', { username: socket.username, room:msg.room });
	});
});

