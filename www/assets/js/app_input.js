$("#card1").on("click", function () {
    $("#cardwaterA").hide()
    $("#cardwaterB").show()
})
$("#card1").mouseleave(function () {
    $("#cardwaterA").show()
    $("#cardwaterB").hide()
})
$("#card2").on("click", function () {
    $("#cardqcA").hide()
    $("#cardqcB").show()
})
$("#card2").mouseleave(function () {
    $("#cardqcA").show()
    $("#cardqcB").hide()
})
$("#card4").on("click", function () {
    $("#cardbioA").hide()
    $("#cardbioB").show()
})
$("#card4").mouseleave(function () {
    $("#cardbioA").show()
    $("#cardbioB").hide()
})
$("#card5").on("click", function () {
    $("#cardotherA").hide()
    $("#cardotherB").show()
})
$("#card5").mouseleave(function () {
    $("#cardotherA").show()
    $("#cardotherB").hide()
})
$('#tabmenu').mouseleave(function () {
    $("#cardwaterB").hide()
    $("#cardqcB").hide()
    $("#cardbioB").hide()
    $("#cardotherB").hide()
})