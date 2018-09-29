var socket = io('http://localhost:3000')

// Lang nghe su kien dang nhap that bai
socket.on('Server-send-dki-thatbai', function() {
  alert("Sai Username (Co nguoi da dang ky roi!!!)");
})

// Lang nghe su kien dang nhap thanh cong
socket.on('Server-send-dki-thanhcong', function(data) {
  $('#currentUser').html(data);
  $('#loginForm').hide(2000);
  $('#chatForm').show(1000);
})

// Nhan danh sach users tu server
socket.on('Server-send-danhsach-Users', function(data) {
  $("#boxContent").html("");
  data.forEach(function(i) {
    $('#boxContent').append("<div class='userOnline'>" + i + "</div>");
  });
})

// Nhan tin nhan tu server
socket.on('server-send-message', function(data) {
  $('#listMessage').append("<div class='ms'><span>" + data.un + "</span>: " + data.nd + "</div>");
  $('#listMessage').scrollTop($('#listMessage')[0].scrollHeight);
})


socket.on('ai-do-dang-go-chu', function(data) {
  $('#thongbao').html("<img src='typing.gif' width='50px' />" + data + " dang go chu");
})

socket.on('ai-do-ngung-go-chu', function(data) {
  $('#thongbao').html("");
})

$(document).ready(function() {

  $("#loginForm").show();
  $("#chatForm").hide();

  // Gui username cho server
  $('#btnRegister').click(function() {
    if ($('#txtUserName').val() === "")
      alert("Phải nhập tên!");
    else if ($('#txtUserName').val().length > 20)
      alert("Tên dưới 20 chữ thôi nhá!");
    else
      socket.emit('Client-send-UserName', $('#txtUserName').val());
  });

  // Userlogout
  $('#btnLogout').click(function() {
    socket.emit('logout');
    $('#chatForm').hide(2000);
    $('#loginForm').show(1000);
  });

  $('#btnSendMessage').click(function() {
    if ($('#txtMessage').val() === "")
      return;
    else {
      socket.emit('user-send-message', $('#txtMessage').val());
      $('#txtMessage').val("");
      $('#txtMessage').focus();
    }
  })

  $('#txtUserName').keypress(function(event) {
    if (event.keyCode == 13) {
      $('#btnRegister').click();
    }
  });

  $('#txtMessage').keypress(function(event) {
    if (event.keyCode == 13) {
      $('#btnSendMessage').click();
    }
  });

  $('#txtMessage').keypress(function() {
    socket.emit('toi-dang-go-chu');
  });

  $('#txtMessage').focusout(function() {
    socket.emit('toi-ngung-go-chu');
  });
})