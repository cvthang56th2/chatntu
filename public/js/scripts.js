var socket = io('http://localhost:3000')
var userName = null
var mangUsers = null
var anonUser = null
var room = null

// Lang nghe su kien dang nhap that bai
socket.on('server send dang ky that bai', function() {
  alert("Sai Username (Có người đăng ký tên này rồi!!!)")
})

// Lang nghe su kien dang nhap thanh cong
socket.on('server send dang ky thanh cong', function(data) {
  userName = data
  $('#txtUserName').val('')

  $('#userName').html(data)
  $('#chat-anon-userName').html(data)
  $('#wrap-enter-chat').hide("slow")
  $('#wrap-chat').show("slow")
})


// CHAT ALL
// Nhan danh sach users tu server
socket.on('server send danh sach user', function(data) {
  $('#wrap-chat-all-user-list').html('')
  mangUsers = data

  $('#total-all-user').html('(' + mangUsers.length + ')')
  data.forEach(function(item) {
    $('#wrap-chat-all-user-list').append('<div class="online-user-name">'+ item.userName +'</div>');
  })
})

socket.on('server send message', function(data) {
  var un = data.userName
  var message = data.message
  var content = '<li class="replies"><p><b>'+ un +'</b>: '+ message +'</p></li>'
  if (un == userName) {
    content = '<li class="sent"><p><b>'+ un +'</b>: '+ message +'</p></li>'
  }

  $('#wrap-chat-all-content ul').append(content)
  $('#wrap-chat-all-content').scrollTop($('#wrap-chat-all-content')[0].scrollHeight);
})

socket.on('server send login', function (data) {
  var content = '<li class="text-center"><p>'+ data.userName +'</b> đã vào</p></li>'
  $('#wrap-chat-all-content ul').append(content)
  $('#wrap-chat-all-content').scrollTop($('#wrap-chat-all-content')[0].scrollHeight);
})

socket.on('server send logout', function (data) {
  var content = '<li class="text-center"><p>'+ data.userName +'</b> đã thoát</p></li>'
  $('#wrap-chat-all-content ul').append(content)
  $('#wrap-chat-all-content').scrollTop($('#wrap-chat-all-content')[0].scrollHeight);
})

socket.on('server chat all typing', function(data) {
  $('#noti-chat-all').html("Ai đó đang chat...");
})

socket.on('server chat all stop', function(data) {
  $('#noti-chat-all').html("");
})





















// CHAT ANONYMOUS
socket.on('server send chat anonymous request', function (data) {
  anonUser = data
  $('#anon-name').html(anonUser.userName)
  $('#anon-noti').html('Có người lạ rồi nè!')
  $('#btn-find-other-anon').show('slow')
})
socket.on('server send chat anonymous request success', function (data) {
  anonUser = data
  $('#anon-name').html(anonUser.userName)
  $('#anon-noti').html('Có người lạ rồi nè!')
  $('#btn-find-other-anon').show('slow')
})

socket.on('server send chat anonymous request logout', function () {
  anonUser = null
  $('#anon-name').html('')
  $('#anon-noti').html("Người lạ đi rồi :'(")
  $('#btn-find-other-anon').hide('slow')
  $('#join-chat-anonymous-btn').show('slow')
})

socket.on('server send message anonymous', function (data) {
  var un = anonUser.userName
  var message = data
  var content = '<div class="message"><span>'+ un +'</span>: '+ message +'</div>'

  $('#wrap-chat-anonymous-content').append(content)
  $('#wrap-chat-anonymous-content').scrollTop($('#wrap-chat-anonymous-content')[0].scrollHeight);
})





















// CHAT NHOM
socket.on('server send chat room message', function (data) {
  var content = '<div class="message"><span>'+ data.userName +'</span>: '+ data.message +'</div>'

  $('#wrap-chat-room-content').append(content)
  $('#wrap-chat-room-content').scrollTop($('#wrap-chat-room-content')[0].scrollHeight);

  $('#chat-room-message').val("")
  $('#chat-room-message').focus()
})

socket.on('server send danh sach room', function (arrRoom) {
  $('#room-list').html('')
  arrRoom.map(function (room, index) {
    var html = '<div class="room">' + '<span>P'+ index + '</span>: ' + room + ', <span>Số lượng: ....</span></div>'
    // <span>Số lượng: </span>1
    $('#room-list').append(html)
  })
})

socket.on('server send dang ky room thanh cong', function (data) {
  room = data.roomName
  $('#room-name').html(data.roomName)
  $('#room-id').html('P' + data.index)
  $('#room-list').html('')
  $('#create_roomName').val('')

  $('.wrap-select-room').hide("slow")
  $('.wrap-room').show("slow")
})


socket.on('server send dang ky room fail', function (createRoomName) {
  alert('Nhóm ' + createRoomName + ' đã tồn tại')
})

socket.on('server send join room thanh cong', function (joinRoomName) {
  room = joinRoomName
  $('#join_roomName').val('')

  $('#room-name').html(joinRoomName)
  $('#wrap-chat-room-content').html('')

  $('.wrap-select-room').hide("slow")
  $('.wrap-room').show("slow")
})

socket.on('server send join room fail', function (joinRoomName) {
  alert('Nhóm ' + joinRoomName + ' chưa tồn tại')
})

socket.on('server send join room', function (userName) {
  var content = '<div class="message"><span>'+ userName +'</span>: đã vào.</div>'

  $('#wrap-chat-room-content').append(content)
  $('#wrap-chat-room-content').scrollTop($('#wrap-chat-room-content')[0].scrollHeight);
})

socket.on('server send leave room', function (userName) {
  var content = '<div class="message"><span>'+ userName +'</span>: đã thoát.</div>'

  $('#wrap-chat-room-content').append(content)
  $('#wrap-chat-room-content').scrollTop($('#wrap-chat-room-content')[0].scrollHeight);
})















// CLICK ......................
$(document).ready(function () {

  $(function(){
    $('a[title]').tooltip()
  })
  
  $('#btn-join-chat').click(function () {
    userName = $('#txtUserName').val()

    if (userName === "")
      alert("Phải nhập tên vào!")
    else if (userName.length > 20)
      alert("Tên dưới 20 chữ thôi nhá!")
    else
      socket.emit('client send username', userName)
  })
  
  $('#btn-logout').click(function () {
    $('#anon-name').html('')
    $('#anon-noti').html('')
    socket.emit('logout', anonUser)
    $('#wrap-chat').hide("slow")
    $('#wrap-enter-chat').show("slow")
    if (anonUser) {
      socket.emit('client send chat anonymous request logout', anonUser)
      anonUser = null
      $('#btn-find-other-anon').hide('slow')
      $('#join-chat-anonymous-btn').show('slow')
    }
  })


  // CHAT ALL
  var chatAllBtn = $('#chat-all-btn')

  chatAllBtn.click(function () {
    var chatAllMessage = $('#chat-all-message').val()
    if (chatAllMessage !== '') {
      socket.emit('client send message', chatAllMessage)
      $('#chat-all-message').val("")
      $('#chat-all-message').focus()
    }
  })

  $('#chat-all-message').keypress(function(event) {
    if (event.keyCode == 13) {
      chatAllBtn.click();
    }
  });

  $('#chat-all-message').keypress(function() {
    socket.emit('client chat all typing');
  });

  $('#chat-all-message').focusout(function() {
    socket.emit('client chat all stop');
  });








  $('#btn-find-other-anon').hide()
  // CHAT ANONYMOUS
  $('#join-chat-anonymous-btn').click(function () {
    socket.emit('client send chat anonymous request')
    $('#anon-noti').html('Đang đợi người lạ...')
    $('#join-chat-anonymous-btn').hide('slow')
  })

  $('#btn-find-other-anon').click(function () {
    $('#anon-name').html('')
    $('#anon-noti').html('')
    if (anonUser) {
      socket.emit('client send chat anonymous request logout', anonUser)
      anonUser = null
      $('#btn-find-other-anon').hide('slow')
      $('#join-chat-anonymous-btn').show('slow')
    }
  })

  var chatAnonymousBtn = $('#chat-anonymous-btn')

  chatAnonymousBtn.click(function () {
    var chatAnonymousMessage = $('#chat-anonymous-message').val()
    
    if (chatAnonymousMessage !== '') {
      var content = '<div class="message"><span>'+ userName +'</span>: '+ chatAnonymousMessage +'</div>'
      $('#wrap-chat-anonymous-content').append(content)
      $('#wrap-chat-anonymous-content').scrollTop($('#wrap-chat-anonymous-content')[0].scrollHeight);
      if (anonUser) {
        socket.emit('client send message anonymous', {
          anonUser: anonUser,
          message: chatAnonymousMessage
        })
      }

      $('#chat-anonymous-message').val("")
      $('#chat-anonymous-message').focus()
    }
  })

  $('#chat-anonymous-message').keypress(function(event) {
    if (event.keyCode == 13) {
      chatAnonymousBtn.click();
    }
  });



  








  

  // CHAT ROOM
  $('#btn-create-room').click(function () {
    var createRoomName = $('#create_roomName').val()
    if (createRoomName !== '') {
      socket.emit('client send create room name', createRoomName)
    }
  })

  $('#btn-join-room').click(function () {
    var joinRoomName = $('#join_roomName').val()

    socket.emit('client send join room name', joinRoomName)
  })

  $('#btn-logout-room').click(function () {
    $('.wrap-room').hide("slow")
    $('.wrap-select-room').show("slow")
  })
  
  $('#chat-room-btn').click(function () {
    var chatRoomMessage = $('#chat-room-message').val()

    if (chatRoomMessage !== '') {
      socket.emit('client send chat room message', {userName: userName, room: room, message: chatRoomMessage})
    }
  })

  $('#btn-logout-room').click(function () {
    socket.emit('client send leave room', room)
    $('.wrap-room').hide("slow")
    $('.wrap-select-room').show("slow")
  })
})