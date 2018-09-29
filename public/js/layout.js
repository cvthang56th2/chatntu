$(document).ready(function () {
  $('#tab-home').click(function () {
    $('#nav-home').show()
    $('#nav-all').hide()
    $('#nav-room').hide()
    $('#nav-anonymous').hide()
  })

  $('#tab-all').click(function () {
    $('#nav-all').show()
    $('#nav-home').hide()
    $('#nav-room').hide()
    $('#nav-anonymous').hide()
  })

  $('#tab-room').click(function () {
    $('#nav-room').show()
    $('#nav-all').hide()
    $('#nav-home').hide()
    $('#nav-anonymous').hide()
  })

  $('#tab-anonymous').click(function () {
    $('#nav-anonymous').show()
    $('#nav-all').hide()
    $('#nav-room').hide()
    $('#nav-home').hide()
  })
})