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
- Run the Redis server with the following commands:
      - cd /path/to/redis/directory
      - ./src/redis-server
- Run socketIO server with the following commands:
      - cd /path/to/BuddyTalk/directory
      - node index.js
- Open client by entering http://localhost:3000

Oops!!! thts all..by now you should get form to give your nick :-)

*** For running multiple socketIO servers you might give the following command:
- PORT=3000 node index.js
- PORT=3001 node index.js
- PORT=3002 node index.js & so on...
        
