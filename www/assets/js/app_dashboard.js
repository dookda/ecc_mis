let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
let urauth = sessionStorage.getItem('.....');
$("#usrname").text(urname);
urid ? null : location.href = "./form_register/login";

$("#cardwc").on("click", function () {
    $("#cardwaterA").hide()
    $("#cardwaterB").show()
})
$("#cardwc").mouseleave(function () {
    $("#cardwaterA").show()
    $("#cardwaterB").hide()
})
$("#cardqc").on("click", function () {
    $("#cardqcA").hide()
    $("#cardqcB").show()
})
$("#cardqc").mouseleave(function () {
    $("#cardqcA").show()
    $("#cardqcB").hide()
})
$("#cardbio").on("click", function () {
    $("#cardbioA").hide()
    $("#cardbioB").show()
})
$("#cardbio").mouseleave(function () {
    $("#cardbioA").show()
    $("#cardbioB").hide()
})
$("#cardother").on("click", function () {
    $("#cardotherA").hide()
    $("#cardotherB").show()
})
$("#cardother").mouseleave(function () {
    $("#cardotherA").show()
    $("#cardotherB").hide()
})
$('#tabmenu').mouseleave(function () {
    $("#cardwaterB").hide()
    $("#cardqcB").hide()
    $("#cardbioB").hide()
    $("#cardotherB").hide()
})
