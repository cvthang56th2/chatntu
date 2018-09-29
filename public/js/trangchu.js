var socket = io('http://localhost:3000')

// Lang nghe su kien dang nhap that bai
socket.on('Server-send-dki-thatbai', function() {
  alert("Sai Username (Co nguoi da dang ky roi!!!)");
})

// Lang nghe su kien dang nhap thanh cong
socket.on('Server-send-dki-thanhcong', function(data) {
  // $('#currentUser').html(data);
  // $('#loginForm').hide(2000);
  // $('#chatForm').show(1000);
  console.log(data)
})

$(document).ready(function () {
  $('#btn-join-chat').click(function () {
    if ($('#txtUserName').val() === "")
      alert("Phải nhập tên!");
    else if ($('#txtUserName').val().length > 20)
      alert("Tên dưới 20 chữ thôi nhá!");
    else
      socket.emit('Client-send-UserName', $('#txtUserName').val());
  })
})