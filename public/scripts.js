var username = '';
var socket = io();

// DOM manipulation
$("#username").keydown(function(event){
 if(event.which == 13) {
    $('.chat-block').show();
    $('.input-block').hide();
    username = $('#username').val();
    socket.emit('join', { username: username });    
  }
});

$('form').submit(function(event){
  event.preventDefault();
  socket.emit('chat message', $('#m').val(), $('#recipient_user').val(), $('#recipient_room').val());
  $('#m').val('');
  $('#recipient_user').val('');
  $('#recipient_room').val('');
  return false;
});

$('#createRoomBtn').click(function () {
  socket.emit('createRoom', { room: $('#room').val() });
  $('#room').val('');
});

$('#joinRoomBtn').click(function () {
  socket.emit('joinRoom', { room: $('#room').val() });
  $('#room').val('');
});


// socket event listeners
socket.on('join', function (msg) {
  //$('#clients').append($('<li>').text(msg.username + ' joined'));
  var users = '';
  msg.users.forEach(function (item) {
    users += item + ' | ';
  });
  $('#users').html(users);
});
socket.on('leave', function (msg) {
  //$('#clients').append($('<li>').text(msg.username + ' left'));
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