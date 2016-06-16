var username = '';
var socket = io();
var room = '';
//*********************************DOM manipulation***************************************
$("#username").keydown(function(event){
 if(event.which == 13) {
    username = $('#username').val().trim();
    if (username.length > 0) {
      $('.chat-block').show();
      $('.user-block').show();
      $('.input-block').hide();
      socket.emit('join', { username: username });
    }
    else {
      alert('username can\'t be empty');  
    }   
  }
});

$('form').submit(function(event){
  event.preventDefault();
  var msg = $('#m').val().trim();
  if (msg.length > 0) {
    socket.emit('chat message', msg, $('#recipient_user').val().trim(), $('#recipient_room').val().trim());
    $('#m').val('');
    $('#recipient_user').val('');
    $('#recipient_room').val('');
  }
  else {
    alert('message can\'t be empty');  
  }
  //return false;
});

$('#createRoomBtn').click(function () {
  room = $('#room').val().trim();
  if (room.length > 0) {
    socket.emit('createRoom', { room: room  });
    $('#room').val('');
  }
  else {
      alert('room name can\'t be empty');  
  }
});

$('#joinRoomBtn').click(function () {
  room = $('#room').val().trim();
  if (room.length > 0) {
    socket.emit('joinRoom', { room: room });
    $('#room').val('');   
  }
  else {
      alert('room name can\'t be empty');  
  } 
});

$('#leaveRoomBtn').click(function () {
  room = $('#room').val().trim();
  if (room.length > 0) {
    socket.emit('leaveRoom', { room: room });
    $('#room').val('');
  }
  else {
      alert('room name can\'t be empty');  
  }
});


//****************************socket event listeners*****************************************
socket.on('join', function (msg) {
  $('#join_leave').append($('<li>').text(msg.username + ' joined'));
  var users = '';
  msg.users.forEach(function (item) {
    users += item + ' | ';
  });
  $('#users').html(users);
});
socket.on('leave', function (msg) {
  $('#join_leave').append($('<li>').text(msg.username + ' left'));
  var users = '';
  msg.users.forEach(function (item) {
    users += item + ' | ';
  });
  $('#users').html(users);
});
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg.username + ': ' + msg.message));
});
socket.on('login', function(msg) {
  $('#self').html('loggedin as: ' + msg.username);
  var rooms = '';
  msg.rooms.forEach(function (item) {
    rooms += item + ' | ';
  });
  $('#rooms').html(rooms);
});
socket.on('createRoom', function (msg) {
  var rooms = '';
  msg.rooms.forEach(function (item) {
    rooms += item + ' | ';
  });
  $('#rooms').html(rooms);
});
socket.on('joinRoom', function (msg) {
  $('#room_join_leave').append($('<li>').text(msg.username + ' joined in ' + msg.room));
});
socket.on('leaveRoom', function (msg) {
  $('#room_join_leave').append($('<li>').text(msg.username + ' left ' + msg.room));
});