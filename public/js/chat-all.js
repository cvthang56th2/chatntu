$(document).ready(function () {
  var chatAllBtn = $('#chat-all-btn')

  chatAllBtn.click(function () {
    var userName = $('#txtUserName').val()
    var chatAllMessage = $('#chat-all-message').val()
    
    if (chatAllMessage !== '') {
      var content = '<div class="message"><span>'+ userName +'</span>: '+ chatAllMessage +'</div>'
      $('#wrap-chat-all-content').append(content)
      $('#wrap-chat-all-content').scrollTop($('#wrap-chat-all-content')[0].scrollHeight);

      $('#chat-all-message').val("")
      $('#chat-all-message').focus()
    }
  })

  $('#chat-all-message').keypress(function(event) {
    if (event.keyCode == 13) {
      chatAllBtn.click();
    }
  });
})