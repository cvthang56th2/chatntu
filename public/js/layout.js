$(document).ready(function () {
  $('#tab-home').click(function () {
    $('#nav-home').show()
    $('#nav-all').hide()
    $('#nav-room').hide()
    $('#nav-anonymous').hide()

    $('#tab-home').addClass('active')
    $('#tab-all').removeClass('active')
    $('#tab-room').removeClass('active')
    $('#tab-anonymous').removeClass('active')
  })

  $('#tab-all').click(function () {
    $('#nav-all').show()
    $('#nav-home').hide()
    $('#nav-room').hide()
    $('#nav-anonymous').hide()

    $('#tab-all').addClass('active')
    $('#tab-home').removeClass('active')
    $('#tab-room').removeClass('active')
    $('#tab-anonymous').removeClass('active')
  })

  $('#tab-room').click(function () {
    $('#nav-room').show()
    $('#nav-all').hide()
    $('#nav-home').hide()
    $('#nav-anonymous').hide()

    $('#tab-room').addClass('active')
    $('#tab-all').removeClass('active')
    $('#tab-home').removeClass('active')
    $('#tab-anonymous').removeClass('active')
  })

  $('#tab-anonymous').click(function () {
    $('#nav-anonymous').show()
    $('#nav-all').hide()
    $('#nav-room').hide()
    $('#nav-home').hide()

    $('#tab-anonymous').addClass('active')
    $('#tab-all').removeClass('active')
    $('#tab-room').removeClass('active')
    $('#tab-home').removeClass('active')
  })
})