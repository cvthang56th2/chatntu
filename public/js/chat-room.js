$(document).ready(function () {
  var chatRoomBtn = $('#chat-room-btn')
  var btnCreateRoom = $('#btn-create-room')
  var btnJoinRoom = $('#btn-join-room')
  
  // btnCreateRoom.click(function () {
  //   var createRoomName = $('#create_roomName').val()

  //   $('#room-name').html(createRoomName)
  //   $('#wrap-chat-room-content').html('')

  //   $('.wrap-select-room').hide("slow")
  //   $('.wrap-room').show("slow")
  // })

  // btnJoinRoom.click(function () {
  //   var joinRoomName = $('#join_roomName').val()

  //   $('#room-name').html(joinRoomName)
  //   $('#wrap-chat-room-content').html('')

  //   $('.wrap-select-room').hide("slow")
  //   $('.wrap-room').show("slow")
  // })
  
  $('#btn-logout-room').click(function () {
    $('.wrap-room').hide("slow")
    $('.wrap-select-room').show("slow")
  })
  
  // chatRoomBtn.click(function () {
  //   var userName = $('#txtUserName').val()
  //   var chatRoomMessage = $('#chat-room-message').val()
    
  //   if (chatRoomMessage !== '') {
  //     var content = '<div class="message"><span>'+ userName +'</span>: '+ chatRoomMessage +'</div>'
  //     $('#wrap-chat-room-content').append(content)
  //     $('#wrap-chat-room-content').scrollTop($('#wrap-chat-room-content')[0].scrollHeight);

  //     $('#chat-room-message').val("")
  //     $('#chat-room-message').focus()
  //   }
  // })
  

  $('#chat-room-message').keypress(function(event) {
    if (event.keyCode == 13) {
      chatRoomBtn.click();
    }
  });
})