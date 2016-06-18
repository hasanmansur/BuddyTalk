# BuddyTalk
Real-time Chat example using Node.js + Express.js + SocketIO + Redis

What?
-----
This example app demonstrates a real time horizontally scalable chat capable of serving concurrent clients.
We are using the following components to build our chat app:
- Node.js
- Express.js
- Socket.io
- Redis

Features
--------
- Messaging: Private, Group/Room, Broadcast
- Room: Create/Join/Leave
- Dashboard:
      - Loggedin Nick
      - Message Board
      - Log of join/leave (both global & room)
      - List of loggedin users
      - List of Rooms
- Horizontal Scalability: Can be scaled out (add more node.js/socket.io servers when you need to serve more clients)

Install & Run
-------------
- Prerequisites:
      - Node.js
      - Redis
- Clone the Repository
      - git clone https://github.com/hasanmansur/BuddyTalk.git
- Run the Redis server
- move to directory /BuddyTalk
- run node index.js

