$(document).ready(function () {
  var joinAnonymousChatBtn = $('#join-chat-anonymous-btn')
  var chatAnonymousBtn = $('#chat-anonymous-btn')

  chatAnonymousBtn.click(function () {
    var userName = $('#txtUserName').val()
    var chatAnonymousMessage = $('#chat-anonymous-message').val()
    
    if (chatAnonymousMessage !== '') {
      var content = '<div class="message"><span>'+ userName +'</span>: '+ chatAnonymousMessage +'</div>'
      $('#wrap-chat-anonymous-content').append(content)
      $('#wrap-chat-anonymous-content').scrollTop($('#wrap-chat-anonymous-content')[0].scrollHeight);

      $('#chat-anonymous-message').val("")
      $('#chat-anonymous-message').focus()
    }
  })

  $('#chat-anonymous-message').keypress(function(event) {
    if (event.keyCode == 13) {
      chatAnonymousBtn.click();
    }
  });
})