var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

http.listen(3000, function(){
  console.log('listening on *:3000');
});
var mangUsers = []
var arrAnon = []
var arrRoom = []

// Socket IO
io.on('connection', function(socket){
  console.log("Co nguoi ket noi: " + socket.id);
  
  socket.on('client send username', function(userName){
    var index = mangUsers.findIndex(function (item) {
      return item.userName === userName
    })

    if (index !== -1) {
      //fail
      socket.emit('server send dang ky that bai');
    } else {
      //thanh cong      
      mangUsers.push({
        userName: userName,
        id: socket.id
      });
      socket.userName = userName;
      socket.emit('server send dang ky thanh cong', userName);
      socket.broadcast.emit('server send login', {
        userName: userName,
        id: socket.id
      });
      io.sockets.emit('server send danh sach user', mangUsers)
      io.sockets.emit('server send danh sach room', arrRoom)
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected ' + socket.id);
    var index = mangUsers.findIndex(function (item) {
      return item.userName === socket.userName
    })

    if (mangUsers[index]) {
      if (mangUsers[index].anonId) {
        if (io.sockets.sockets[mangUsers[index].anonId]) {
          io.sockets.sockets[mangUsers[index].anonId].emit('server send chat anonymous request logout')
        }
      }
      socket.broadcast.emit('server send logout', mangUsers[index]);
    }
    mangUsers.splice(index, 1);
    
    // Gui danh sach cho tất cả mọi người trừ user A
    socket.broadcast.emit('server send danh sach user', mangUsers);
    io.sockets.emit('server send danh sach room', arrRoom)
    if (socket.anonId) {
      if (io.sockets.sockets[socket.anonId]) {
        io.sockets.sockets[socket.anonId].emit('server send chat anonymous request logout')
      }
    }
  });

  // Logout
  socket.on('logout', function(anonUser) {
    console.log(socket.userName + " da thoat!");
    // Xoa user trong mangUsers

    var index = mangUsers.findIndex(function (item) {
      return item.userName === socket.userName
    })
    if (mangUsers[index]) {
      socket.broadcast.emit('server send logout', mangUsers[index]);
    }

    mangUsers.splice(index , 1);
    
    // Gui danh sach cho tất cả mọi người trừ user A
    socket.broadcast.emit('server send danh sach user', mangUsers);
    io.sockets.emit('server send danh sach room', arrRoom)
    if (anonUser) {
      if (io.sockets.sockets[anonUser.id]) {
        io.sockets.sockets[anonUser.id].emit('server send chat anonymous request logout')
      }
    }
  })








  // CHAT ALL
  // Nghe su kien user gui tin nhan
  socket.on('client send message', function(data) {
    io.sockets.emit('server send message', { 'userName': socket.userName, 'message': data });
  })

  socket.on('client chat all typing', function() {
    socket.broadcast.emit('server chat all typing', socket.userName);
  });

  socket.on('client chat all stop', function() {
    socket.broadcast.emit('server chat all stop', socket.userName);
  });





















  // CHAT ANONYMOUS
  socket.on('client send chat anonymous request', function () {
    arrAnon.push({
      id: socket.id,
      userName: socket.userName
    })

    // Neu chua co ai (co 1 nguoi chinh la thang vua gui yeu cau) thi keu no doi
    if (arrAnon.length === 1) {
      return
    } else {
      // Neu da co nguoi thi ghep doi voi thang dau tien cua mang anon, dong thoi gui thong bao toi thang vua dc chon
      // Sau do cho mang anon ve rong
      anonUser = arrAnon[0]
      var index1 = mangUsers.findIndex(e => e.id === anonUser.id)

      if (index1 !== -1) {
        mangUsers[index1].anonId = socket.id
      }

      var index2 = mangUsers.findIndex(e => e.id === socket.id)

      if (index2 !== -1) {
        mangUsers[index2].anonId = anonUser.id
      }
      socket.anonId = anonUser.id
      if (io.sockets.sockets[socket.id] && io.sockets.sockets[anonUser.id]) {
        io.sockets.sockets[socket.id].emit('server send chat anonymous request', anonUser)
        io.sockets.sockets[anonUser.id].emit('server send chat anonymous request success', {
          id: socket.id,
          userName: socket.userName
        })
        arrAnon.splice(arrAnon.length - 1, 1)
        arrAnon.splice(0, 1)
      }
    }
  })

  socket.on('client send chat anonymous request logout', function (anonUser) {
    if (io.sockets.sockets[anonUser.id]) {
      io.sockets.sockets[anonUser.id].emit('server send chat anonymous request logout')
    }
  })

  socket.on('client send message anonymous', function (data) {
    var anonUser = data.anonUser
    var message = data.message
    if (anonUser) {
      if (io.sockets.sockets[anonUser.id]) {
        io.sockets.sockets[anonUser.id].emit('server send message anonymous', message)
      }
    }
  })















  // CHAT ROOM
  socket.on('client send create room name', function (createRoomName) {
    var index = arrRoom.findIndex(function (room) {
      return room === createRoomName
    })
  
    if (index !== -1) {
      socket.emit('server send dang ky room fail', createRoomName) 
    } else {
      arrRoom.push(createRoomName)
      socket.join(createRoomName)
      socket.emit('server send dang ky room thanh cong', {roomName: createRoomName, index: arrRoom.length - 1})
      io.sockets.emit('server send danh sach room', arrRoom)
    }
  })

  socket.on('client send join room name', function (joinRoomName) {
    var index = arrRoom.findIndex(function (room) {
      return room === joinRoomName
    })

    if (index === -1) {
      socket.emit('server send join room fail', joinRoomName) 
    } else {
      socket.join(joinRoomName)
      io.sockets.in(joinRoomName).emit('server send join room', socket.userName)
      socket.emit('server send join room thanh cong', joinRoomName)
    }
  })

  socket.on('client send chat room message', function (data) {
    io.sockets.in(data.room).emit('server send chat room message', data)
  })

  socket.on('client send leave room', function (room) {
    socket.leave(room);
    io.sockets.in(room).emit('server send leave room', socket.userName)
    var clientRoom = io.sockets.adapter.rooms[room];
    if (!clientRoom) {
      var index = arrRoom.findIndex(function (item) {
        return item === room
      })
      arrRoom.splice(index, 1)
      io.sockets.emit('server send danh sach room', arrRoom)
    }
  })
})

// Routes
app.get('/', function(req, res) {
  res.render('index');
})
app.get('/layout', function(req, res) {
  res.render('layout');
})
